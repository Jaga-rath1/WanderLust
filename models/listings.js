const { name } = require("ejs");
const mongoose = require("mongoose");
let mongoSchema = mongoose.Schema;
let Review = require("./review.js");
const { id } = require("../schema");
const { string, required } = require("joi");
//Define Schema
let ListingsSchema = new mongoSchema({
    name : {
        type : String,
        required : true
    },
    description : {
        type :String,
    },
    img : {
        filename :{
            type : String,
        },
        url :{
        type : String,
        default : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set :(v)=>
            v === ""
            ?"https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : v
        }
        
    },
    price : {
        type : Number
    },
    location : {
        type : String
    },
    country : {
        type : String
    },
    reviews : [
        {
            type : mongoSchema.Types.ObjectId,
            ref : "Review"
        }
    ],
    owner : {
        type : mongoSchema.Types.ObjectId,
        ref : "User",
    },
    geometry : {
        type : {
            type : String,
            enum :["Point"],
            required : true,
        },
        coordinates : {
            type : [Number],
            required : true,
        }
    },
});
ListingsSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id :{$in:listing.reviews}});
    };
});
ListingsSchema.index({ geometry: "2dsphere" });

let Listings = mongoose.model("Listings",ListingsSchema);
module.exports = Listings;