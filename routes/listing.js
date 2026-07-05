const express = require("express");
let router = express.Router();
let path = require("path");
let Listings = require("../models/listings.js");
let wrapAsync = require("../utils/wrapAsync.js");
let ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const {isLoggedin} = require("../middleware.js");
const {isOwner} = require("../middleware.js");
let listingControllers = require("../controllers/listing.js");
//for cloudinary
const {storage} = require("../cloudConfig.js");
//for multer
const multer  = require('multer');
const upload = multer({ storage });
const validateSchema = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
    let errmsg = error.details[0].message;
        throw new ExpressError(400,errmsg);
    }else{
        next();
    };
};
//Show Listings title 
router.get("/",wrapAsync(listingControllers.showListing));
//Rendered a Form for new listings
router.get("/new",isLoggedin,listingControllers.renderNewlisting);
//show All the Details Of The Listing 
router.get("/:id",isLoggedin,wrapAsync(listingControllers.showAlldets));
// route to add new listing to the database
//add the form to the database
router.post("/",isLoggedin,validateSchema,
    upload.single("listing[img][url]"),
    wrapAsync(listingControllers.addNewlisting));
//update the Chat
//render a form
router.get("/:id/edit",isLoggedin,isOwner,wrapAsync(listingControllers.renderEditform));
//add the form data to database (Updated)
router.put("/:id",isLoggedin,isOwner,
    upload.single("listing[img][url]"),
    wrapAsync(listingControllers.editedFormdata));
//delete Listing
router.delete("/:id",isLoggedin,isOwner,wrapAsync(listingControllers.deleteListing));

module.exports = router;