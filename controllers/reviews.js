let Review = require("../models/review.js");
let Listings = require("../models/listings.js");
module.exports.addReview = async(req,res)=>{
    let {id} = req.params;
    let currlisting = await Listings.findById(id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    currlisting.reviews.push(newReview);
    await newReview.save();
    await currlisting.save();
    req.flash("success","Review Added SuccessFully")
    res.redirect(`/listings/${id}`);
    console.log("New Review Saved");
};
module.exports.deleteReview = async(req,res)=>{
    let {id ,reviewId} = req.params;
    //delete the review from listing
    await Listings.findByIdAndUpdate(id,{$pull : {reviews : reviewId}});
    //delete the review from database
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted SuccessFully");
    res.redirect(`/listings/${id}`);
};