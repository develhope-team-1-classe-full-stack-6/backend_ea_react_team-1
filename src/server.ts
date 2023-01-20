import "dotenv/config";
import express from "express";
import "express-async-errors";

import userRoute from "./router/users";

const app = express();
const port = process.env.PORT;

app.use(express.json())
app.use("/users", userRoute)


app.listen(port, () => {
    console.log(`[SERVER] Server is running at http://localhost:${port}`);
})
