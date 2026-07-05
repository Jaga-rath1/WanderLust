const express = require("express");
let router = express.Router({mergeParams:true});
let Listings = require("../models/listings.js");
let Review = require("../models/review.js");
let wrapAsync = require("../utils/wrapAsync.js");
//require Expresserror
let ExpressError = require("../utils/ExpressError.js");
//require schema
const listingSchema = require("../schema.js");
const {reviewSchema} = require("../schema.js");
const { route } = require("./listing.js");
const { isLoggedin } = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");
//validate schema using joi implement it by middlware
const validateSchema = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
    let errmsg = error.details[0].message;
        throw new ExpressError(400,errmsg);
    }else{
        next();
    };
};
//validate  review Schema
const validatereviewSchema = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body);
    if(error){
    let errmsg = error.details[0].message;
        throw new ExpressError(400,errmsg);
    }else{
        next();
    };
};
//for Review
router.post("/",validatereviewSchema,isLoggedin,wrapAsync(reviewController.addReview));
//for deleteReview
router.delete("/:reviewId",isLoggedin,isReviewAuthor,wrapAsync(reviewController.deleteReview));
module.exports = router;