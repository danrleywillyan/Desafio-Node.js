const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

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
     * @route GET /api/test/all
     * @group teste - api para testar token e acessos
     * @param {string} cpf.query - cpf - eg: 05845685645645
     * @param {string} password.query - user's password.
     * @param {string} token.header - token
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.get("/api/test/all", controller.allAccess);

    /**
     * This function comment is parsed by doctrine
     * @route GET /api/test/seller
     * @group teste - api para testar token e acessos
     * @param {string} cpf.query.required - cpf - eg: 05845685645645
     * @param {string} password.query.required - user's password.
     * @param {string} token.header.required - token
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.get("/api/test/seller", [authJwt.verifyToken], controller.sellerBoard);

    /**
     * This function comment is parsed by doctrine
     * @route GET /api/test/admin
     * @group teste - api para testar token e acessos
     * @param {string} cpf.query.required - cpf - eg: 05845685645645
     * @param {string} password.query.required - user's password.
     * @param {string} token.header.required - token
     * @returns {object} 200 - An array of user info
     * @returns {Error}  default - Unexpected error
     */
    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};