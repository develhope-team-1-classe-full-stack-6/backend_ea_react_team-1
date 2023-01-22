import { Router } from "express";
import { hashingPassword } from "../lib/middleware/cryptoPassword.js";
import validatorResultMiddleware from "../lib/middleware/validator.js";
import prisma from "../lib/prisma.js"
import { schemaSignin } from "../lib/schema/schema.js";
import { checkAuthorization } from "../lib/session/passport.js";

const router = Router();

router.get("/users", async (req, res) => {
    try {
        const users = await prisma.users.findMany();
        res.status(200)
        res.header("Content-Type", "application/json")
        res.json(users)
    }
    catch (error) {
        res.status(500)
        res.header("Content-Type", "application/json")
        return res.json({ status: "error 500", message: `${error.message}` })
    }

})

router.get("/users/:id", checkAuthorization, async (req, res) => {
    try {
        const usersId = Number(req.params.id)
        const user = await prisma.users.findUnique({
            where: {
                id: usersId
            }
        })
        if (!user) {
            res.status(404)
            res.header("Content-Type", "application/json")
            return res.json({ status: "error 404", message: "utente non trovato" })
        }
        res.status(200)
        res.header("Content-Type", "application/json")
        res.json(user)
    }
    catch (error) {
        res.status(500)
        res.header("Content-Type", "application/json")
        return res.json({ status: "error 500", message: `${error.message}` })
    }

})

router.post("/users",
    schemaSignin,
    validatorResultMiddleware,
    hashingPassword,
    async (req, res) => {
        try {
            const { email, idEA, password } = req.body
            const user = await prisma.users.create({
                data: {
                    email: email,
                    idEA: idEA,
                    password: password
                }
            });
            res.status(201)
            res.header("Content-Type", "application/json")
            res.json({ message: "utente creato", data: user })
        }
        catch (error) {
            res.status(500)
            res.header("Content-Type", "application/json")
            return res.json({ status: "error 500", message: `${error.message}` })
        }
    });



router.delete("/users/:id", checkAuthorization, async (req, res) => {
    try {
        const usersId = Number(req.params.id)
        const user = await prisma.users.findUnique({
            where: {
                id: usersId
            }
        })
        if (!user) {
            res.status(404)
            res.header("Content-Type", "application/json")
            return res.json({ status: "error 404", message: "utente non trovato" })
        }
        await prisma.users.delete({
            where: {
                id: usersId
            }
        })
        res.status(200)
        res.header("Content-Type", "application/json")
        res.json({ status: "200 OK", message: "utente eliminato" })
    }
    catch (error) {
        res.status(500)
        res.header("Content-Type", "application/json")
        return res.json({ status: "error 500", message: `${error.message}` })
    }
})

export default router;
