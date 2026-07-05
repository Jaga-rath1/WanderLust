let express = require("express");
let path = require("path");
let router = express.Router();
let User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
let passport = require("passport");
let {saveRedirectUrl} = require("../middleware.js");
let userController =require("../controllers/user.js");
//for signup
router.get("/signup",userController.renderSignupform);

router.post("/signup",wrapAsync(userController.signUp));
//for login
router.get("/login",userController.renderLoginform);
router.post("/login",saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect : "/login",
    failureFlash : true,
}),userController.login);
//for logout
router.get("/logout",userController.logOut);

module.exports = router;