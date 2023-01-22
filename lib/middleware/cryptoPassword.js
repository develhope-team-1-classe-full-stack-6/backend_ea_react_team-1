import bcrypt from 'bcrypt';


const saltRounds = 10;

function hashingPassword(req, res, next) {
    const password = req.body.password;
    req.body = Object.assign({}, req.body, { password: bcrypt.hashSync(req.body.password, saltRounds) });
    next();
}

/* bcrypt.compare(plainPassword, hash, (err, result) => {
    if (result) {
        console.log('password corretta');
    } else {
        console.log('password errata');
    }
}); */

export { hashingPassword }
