let {saveRedirectUrl} = require("../middleware.js");
let User = require("../models/user.js");
module.exports.renderSignupform =(req,res)=>{
    res.render("users/signup.ejs");
};
module.exports.signUp = async(req,res,next)=>{
    try{
        let {username,email,password} = req.body;
    let newuser = await new User({username,email});
    let registereduser = await User.register(newuser,password);
    req.login(registereduser,(err)=>{
        if(err){
            next(err);
        };
        req.flash("success","User Registered Successfully");
        return res.redirect("/listings");
    });
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
};
module.exports.renderLoginform = (req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login = async(req,res)=>{
    let redirectUrl = res.locals.redirectUrl || "/listings" ;
    req.flash("success","Welome Back ! Welcome To Your Account");
    res.redirect(redirectUrl);
};
module.exports.logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You Logged Out SucessFully");
        return res.redirect("/listings");
    })
};