//routes/auth.routes.js 
const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
module.exports = (app) => {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        next();
    });

    app.post("/api/auth/signup",

    [verifySignUp.checkNullInputs, verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],

    controller.signup);

    app.post("/api/auth/signin", controller.signin);

};