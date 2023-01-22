import "dotenv/config"
import express from "express";
import passport from "passport";
import config from "./config.js";
import initSessionMiddleware from "./lib/session/session.js";
import usersRoute from "./routes/users.js"
import authRoute from "./routes/auth.js"

const app = express();

app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());


app.use(express.json());

app.use("/", usersRoute)
app.use("/auth", authRoute)

const port = config.PORT

app.listen(port, () => console.log(`[Server]: Server are running on port http://localhost:${port}`));
