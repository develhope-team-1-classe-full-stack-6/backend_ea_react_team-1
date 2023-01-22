import { validationResult } from 'express-validator';
import express from "express";


const validatorResultMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next()
}


export default validatorResultMiddleware;
