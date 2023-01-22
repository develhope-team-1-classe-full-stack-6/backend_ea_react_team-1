import session from "express-session";

import config from "../../config.js";

export default function initSessionMiddleware() {
    return session({
        secret: config.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
    });
}
