import { body } from "express-validator";

const schema = [
    body('email').isEmail().withMessage('Invalid email address'),
    body('idEA').isLength({ min: 4, max: 16 }).withMessage('idEA must be between 4 and 16 characters'),
    body('password').isLength({ min: 8, max: 64 }).withMessage('Password must be between 8 and 64 characters')
]

export default schema;
