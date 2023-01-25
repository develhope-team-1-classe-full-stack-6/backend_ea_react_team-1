import { Router } from "express";
import validatorResultMiddleware from "../lib/middleware/validator.js";
import { schemaLogin, schemaSignin } from "../lib/schema/schema.js";
import prisma from "../lib/prisma.js";
import hashingPassword from "../lib/middleware/cryptoPassword.js"
import { passport } from "../lib/middleware/session/passport.js";

const router = Router()

router.get("/users", async (req, res) => {
    const users = await prisma.users.findMany();
    res.json(users);
})


router.post("/login", schemaLogin, validatorResultMiddleware, passport.authenticate('local', {
    successRedirect: "/auth/success",
    failureRedirect: "/auth/failure",
    failureFlash: true
}))

router.get("/success", (req, res) => {
    res.status(200)
        .header("Content-Type", "application/json")
        .json({ status: "stato 200", messaggio: "login eseguito" })
});

router.get("/failure", (req, res) => {
    res
        .status(404)
        .header("Content-Type", "application/json")
        .json({ status: "stato 404", messaggio: "utente non trovato" });

});

router.post("/signin", schemaSignin,
    validatorResultMiddleware,
    hashingPassword,
    async (req, res) => {
        const { email, idEA, password } = req.body;

        try {
            const user = await prisma.users.findFirst({
                where: {
                    OR: [
                        {
                            email: email
                        }, {
                            idEA: idEA
                        }]
                }
            });

            if (!user) {
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
                    .json({ status: "stato 201", messaggio: "utente registrato" })
            } else {
                return res
                    .status(405)
                    .header("Content-Type", "application/json")
                    .json({ status: "stato 405", messaggio: "utente già registrato" })
            }
        } catch (error) {
            return res
                .status(500)
                .header("Content-Type", "application/json")
                .json({ status: "error 500", message: `${error.message}` })
        }
    })

export default router;
