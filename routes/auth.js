import { Router } from "express";
import validatorResultMiddleware from "../lib/middleware/validator.js";
import { schemaLogin, schemaSignin } from "../lib/schema/schema.js";
import prisma from "../lib/prisma.js";
import hashingPassword from "../lib/middleware/cryptoPassword.js"
import { checkAuthorization, passport } from "../lib/middleware/session/passport.js";

const router = Router()

router.get("/user", checkAuthorization, async (req, res) => {
    try {
        const idUser = req.session.passport.user;
        const users = await prisma.users.findFirst({
            where: { id: idUser }
        });
        res
            .status(200)
            .header("Content-Type", "application/json")
            .json({ email: users.email, idEA: users.idEA })
    } catch (error) {
        return res
            .status(500)
            .header("Content-Type", "application/json")
            .json({ status: "error 500", message: `${error.message}` })
    }
})

router.post("/login", schemaLogin, validatorResultMiddleware, passport.authenticate('local', {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
    failureFlash: true
}))

router.get("/success", checkAuthorization, (req, res) => {
    res.status(200)
        .header("Content-Type", "application/json")
        .json({ status: "stato 200", message: "login eseguito" })
});

router.get("/failure", (req, res) => {
    res
        .status(404)
        .header("Content-Type", "application/json")
        .json({ status: "stato 404", message: "utente non trovato" });

});

router.post("/signup", schemaSignin,
    validatorResultMiddleware,
    hashingPassword,
    async (req, res) => {
        const { email, idEA, password } = req.body;

        try {
            await prisma.users.create({
                data: {
                    email: email,
                    idEA: idEA,
                    password: password
                }
            });

            return res
                .status(201)
                .header("Content-Type", "application/json")
                .json({ status: "stato 201", message: "utente registrato" })
        } catch (error) {
            return res
                .status(500)
                .header("Content-Type", "application/json")
                .json({ status: "error 500", message: `${error.message}` })
        }
    })

router.get("/logout", (req, res, next) => {

    req.logout((error) => {
        if (error) {
            return next(error);
        }

        res.json({ status: "status 200", message: `utente non loggato` })
    });
});

export default router;
