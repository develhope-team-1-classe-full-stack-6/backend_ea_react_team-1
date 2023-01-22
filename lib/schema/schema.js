import { body } from "express-validator";

const schemaSignin = [
    body().custom((value) => {
        if (value) {
            const allowedProperties = ['email', 'idEA', 'password'];
            Object.keys(value).forEach((property) => {
                if (!allowedProperties.includes(property)) {
                    delete value[property];
                }
            });
        }
        return true;
    }),
    body('email').isEmail().withMessage('Invalid email address'),
    body('idEA').isLength({ min: 4, max: 16 }).withMessage('idEA must be between 4 and 16 characters'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
];
const schemaLogin = [
    body().custom((value) => {
        if (value) {
            const allowedProperties = ['email', 'password'];
            Object.keys(value).forEach((property) => {
                if (!allowedProperties.includes(property)) {
                    delete value[property];
                }
            });
        }
        return true;
    }),
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
]

export { schemaSignin, schemaLogin };
