const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateCPF = (req, res, next) => {
    User.findOne({
        cpf: req.body.cpf
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }

        if (user) {
            res.status(400).send({ message: "Failed! CPF is already in use!" });
            return;
        }

        next();
    });
};

// check if role in the request exists
checkRolesExisted = (req, res, next) => {
    if (req.body.roles) {
        for (let i = 0; i < req.body.roles.length; i++) {
            if (!ROLES.includes(req.body.roles[i])) {
                res.status(400).send({
                    message: `Failed! Role ${req.body.roles[i]} does not exist!`
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateCPF,
    checkRolesExisted
};

module.exports = verifySignUp;