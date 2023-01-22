import { Router } from "express";
import redirectQuery from "../lib/middleware/checkRedirectQuery.js";
import { passport } from "../lib/session/passport.js";
import validatorResultMiddleware from "../lib/middleware/validator.js";

import { schemaLogin } from "../lib/schema/schema.js";

const router = Router();

router.post("/login",
    schemaLogin,
    validatorResultMiddleware,
    redirectQuery,
    (req, res, next) => {
        req.session.redirectTo = req.query.redirectTo;
        console.log(req.session.redirectTo)
        next()
    }, passport.authenticate('local', {
        successRedirect: "/success",
        failureRedirect: "/fail",
        failureFlash: true
    }),
    (req, res) => {
        res.send("welcome" + req.session.user)
    },
);

router.get("/logout", redirectQuery, (req, res, next) => {

    const redirectUrl = req.query.redirectTo;

    req.logout((error) => {
        if (error) {
            return next(error);
        }

        res.redirect(redirectUrl);
    });
});

export default router;
