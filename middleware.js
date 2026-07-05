let Review = require("./models/review.js");
let Listings = require("./models/listings.js");
module.exports.isLoggedin = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You Must Be Logged In To Perform The Operations");
        return res.redirect("/signup");
    };
    next();
};
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    };
    next();
};
module.exports.isOwner = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    if(!listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You Are Not Owner Of This Listing");
        return res.redirect(`/listings/${id}`);
    };
    next();
};
module.exports.isReviewAuthor = async(req,res,next)=>{
    let {id ,reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
        req.flash("error","You Are Not Owner Of This Review");
        return res.redirect(`/listings/${id}`);
    };
    next();
};
