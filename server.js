import express from 'express';
import { PrismaClient } from '@prisma/client';
import {body, validationResult} from 'express-validator';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany();
    res.status(200)
    res.header("Content-Type", "application/json")
    res.json(users)
  } 
  catch (error) {
    res.status(500)
    res.header("Content-Type", "application/json")
    return res.json({status: "error 500", message: "errore server"})
  }
  
})

app.get("/users/:id", async (req, res) => {
  try{
    const usersId = Number(req.params.id)
    const user = await prisma.users.findUnique({
      where: {
        id: usersId
      }
    })
    if(!user) {
      res.status(404)
      res.header("Content-Type", "application/json")
      return res.json({status: "error 404", message: "utente non trovato"})
    }
    res.status(200)
    res.header("Content-Type", "application/json")
    res.json(user)
  }
  catch (error) {
    res.status(500)
    res.header("Content-Type", "application/json")
    return res.json({status: "error 500", message: "errore server"})
  }
  
})

app.post("/users", 
  body("username").notEmpty(),
  body("password").isLength({min: 8, max: 10}).withMessage("la password può essere minimo 8 massimo 10"),
async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {username, password} = req.body
    const user = await prisma.users.create({
      data: {
        username: username,
        password: password
      }
    });
    res.status(201)
    res.header("Content-Type", "application/json")
    res.json({message: "utente creato", data: user})
  } 
  catch (error) {
    res.status(500)
    res.header("Content-Type", "application/json")
    return res.json({status: "error 500", message: "errore server"})
  }
})


const port = 3000

app.listen(port,() => console.log(`running on port http://localhost:${port}` ));