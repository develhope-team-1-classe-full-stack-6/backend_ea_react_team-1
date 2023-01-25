import bcrypt from 'bcrypt';


const saltRounds = 10;

function hashingPassword(req, res, next) {
    const password = req.body.password;
    req.body = Object.assign({}, req.body, { password: bcrypt.hashSync(req.body.password, saltRounds) });
    next();
}

export default hashingPassword;
