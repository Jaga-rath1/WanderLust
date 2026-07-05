//dotenv
if(process.env.NODE_ENV != "production"){
    require('dotenv').config();
};
//console.log(process.env);
const express = require("express");
let app = express();
let port = 3000;
let path = require("path");
let mongoose = require("mongoose");
let Listings = require("./models/listings.js");
let Review = require("./models/review.js");
//user router require
let Userrouter = require("./routes/user.js");
//lisings route require
let Listingrouter = require("./routes/listing.js");
//Reviews route require
let Reviewsrouter = require("./routes/reviews.js");
//required wrapAsync.js
let wrapAsync = require("./utils/wrapAsync.js");
//require Expresserror
let ExpressError = require("./utils/ExpressError.js");
//require schema
const listingSchema = require("./schema.js");
const reviewSchema = require("./schema.js");
//for ejs mate
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);
//for connect flash
const flash = require("connect-flash");
//for expressSession
const session = require("express-session");
app.use(session({
    secret : "mysecretkey",
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7 *24 * 60 *60 *1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true,
    },
}));
app.use(flash());
//user model for authentication
let User = require("./models/user.js");
//user authentication passport middleware
let passport = require("passport");
const LocalStrategy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//ejs rendering
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
//Serving Static File
app.use(express.static(path.join(__dirname,"public")));
//for Post Request
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//for method override
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
//mongo connect
let mongourl = "mongodb://127.0.0.1:27017/Wanderlust";
let dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(mongourl);
};
main()
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log(err);
});
// app.listen
app.listen(port,()=>{
    console.log("Sunuchi Bhai");
});
//for flash messages middleware
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
// app.get("/demouser",async(req,res)=>{
//     let fakeuser = new User({
//         email : "student122gmail.com",
//         username : "Pandu",
//     });
//     let newuser = await User.register(fakeuser,"hello12");
//     res.send(newuser);
// })
//app.get
app.get("/home",(req,res)=>{
    res.send("Redirected To Home SuccessFully");
});
//for User
app.use("/",Userrouter);
//use route folder 
app.use("/listings",Listingrouter);
//for Review
app.use("/listings/:id/reviews",Reviewsrouter);
app.use((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});
app.use((err,req,res,next)=>{
    let{status = 500,message = "Something Went Wrong"} = err;
    res.status(status).render("error.ejs",{message});
});
