import passport from "passport";
import passportLocal from "passport-local"
import prisma from "../../prisma.js";
import bcrypt from "bcrypt";

const LocalStrategy = new passportLocal({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            const user = await prisma.users.findUnique({
                where: { email }
            });
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect email'
                });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, {
                    message: 'Incorrect password'
                });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
);


passport.use(LocalStrategy);


passport.serializeUser(
    (user, done) => {
        done(null, user.id);
    });

passport.deserializeUser(
    async (id, done) => {
        const user = await prisma.users.findUnique({ where: { id } });
        done(null, user);
    });

const checkAuthorization = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json({ status: "Forbidden 403", message: "non autorizzato" }).end()
}


export { passport, checkAuthorization };
