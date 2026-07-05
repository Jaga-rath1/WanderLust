let Listings = require("../models/listings.js");
const axios = require("axios");
module.exports.showListing = async(req,res)=>{
    let allListings = await Listings.find();
    res.render("listing/index.ejs",{allListings});
};
module.exports.renderNewlisting = (req,res)=>{
    res.render("listing/new.ejs")
};
module.exports.showAlldets = async(req,res)=>{
    let {id} = req.params;
    let listing  = await Listings.findById(id)
    .populate({path : "reviews",
        populate : {
            path : "author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","This Listing May Be Deleted");
        return res.redirect("/listings");
    };
    res.render("listing/show.ejs",{listing});
};

module.exports.addNewlisting = async(req,res,next)=>{
    if(!req.body.listing){
        throw new ExpressError(500,"Please Send Some Valid data");
    };
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = req.body.listing;
    const newListing = new Listings(listing);
    newListing.owner = req.user._id;
    newListing.img = {url,filename};
    //for location
    let location = req.body.listing.location;
    let response = await axios.get(
    "https://api.geoapify.com/v1/geocode/search",
    {
        params: {
            text: location,
            apiKey: process.env.GEOAPIFY_API_KEY,
        },
    }
);
    newListing.geometry = response.data.features[0].geometry;
    await newListing.save();
    req.flash("success","New Listing Created");
    res.redirect("/listings");
    
};
module.exports.renderEditform = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    let orginalImgUrl = listing.img.url;
    orginalImgUrl = orginalImgUrl.replace(
        "/upload",
        "/upload/w_250"
    );
    res.render("listing/edit.ejs",{listing,orginalImgUrl});
};
module.exports.editedFormdata = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listings.findById(id);
    listing.set({...req.body.listing});
    //await Listings.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
        listing.img = {
            filename : req.file.filename,
            url : req.file.path,
        };
    };
    await listing.save();
    req.flash("success","Chat Updated");
    res.redirect(`/listings/${id}`);
};
module.exports.deleteListing = async(req,res)=>{
    let {id} = req.params;
    let dellisting = await Listings.findByIdAndDelete(id);
    req.flash("success","Review Deleted")
    res.redirect("/listings");
};