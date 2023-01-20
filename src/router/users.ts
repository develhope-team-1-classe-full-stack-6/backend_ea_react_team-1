import { Router } from "express";

const router = Router();

const persons = [
    {
        "id": 1,
        "surname": "Filippo",
        "lastname": "Di Marco",
        "email": "filidm5795@gmail.com",
        "password": "password"
    },
    {
        "id": 2,
        "surname": "Alberto",
        "lastname": "Passarella",
        "email": "albertopassarella@gmail.com",
        "password": "password"
    }
];

//CREATE
router.post("/create", (req, res) => {

    const newUser = req.body;

    persons.push({
        id: persons.length + 1,
        ...newUser
    });

    res
        .status(201)
        .json(persons);
})

//READ

router.get("/read", (req, res) => {
    res
        .status(200)
        .json(persons)
})

router.post("/read", (req, res) => {
    const userID = req.body.id as number;
    const user = persons.find(item => item.id == userID);

    res
        .status(200)
        .json(user);
})

//UPDATE
router.put("/update", (req, res) => {
    const userID = req.body.id as number;
    const position = persons.findIndex(item => item.id == userID);
    persons[position] = req.body;

    res
        .status(201)
        .json(persons[position]);
})

//DELETE

router.delete("/delete", (req, res) => {
    const userID = req.body.id as number;
    const position = persons.findIndex(item => item.id == userID);
    persons.splice(position, 1)


    res.json(persons)
})


export default router;
