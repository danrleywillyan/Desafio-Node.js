const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
     * This function comment is parsed by doctrine
     * @route POST /api/auth/signup
     * @group auth - login e signup
     * @param {string} cpf.query.required - cpf - eg: 05845685645645
     * @param {string} password.query.required - user's password.
     * @param {string} token.header.required - token
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateCPF,
            verifySignUp.checkRolesExisted
        ],
        controller.signup
    );

    /**
     * This function comment is parsed by doctrine
     * @route POST /api/auth/signin
     * @group auth - login e signup
     * @param {json} cpf.json.required - cpf - eg: 05845685645645
     * @param {string} password.query.required - user's password.
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.post("/api/auth/signin", controller.signin);
};