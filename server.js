import "dotenv/config"
import express from "express";
import config from "./config.js";
import authRoute from "./routes/auth.js";
import cors from "cors";
import initSessionMiddleware from "./lib/middleware/session/session.js";
import passport from "passport";

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000"
}))

app.use("/auth", authRoute)


const port = config.PORT

app.listen(port, () => console.log(`[Server]: Server are running on port http://localhost:${port}`));
