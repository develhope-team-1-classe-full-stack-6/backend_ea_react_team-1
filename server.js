import "dotenv/config"
import express from "express";
import config from "./config.js";
import usersRoute from "./routes/users.js"

const app = express();
app.use(express.json());

app.use("/", usersRoute)

const port = config.PORT

app.listen(port, () => console.log(`[Server]: Server are running on port http://localhost:${port}`));
