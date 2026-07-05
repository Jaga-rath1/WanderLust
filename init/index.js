const mongoose = require("mongoose");
let Listings = require("../models/listings.js");
let initdata = require("./data.js");
let mongourl = "mongodb://127.0.0.1:27017/Wanderlust";
//let dbUrl = process.env.ATLASDB_URL;
async function main() {
    await mongoose.connect(mongourl)};
main()
.then(()=>{
    console.log("Connected");
})
.catch((err)=>{
    console.log(err);
});
const initdb = async()=>{
    await Listings.deleteMany({});
    initdata.data = initdata.data.map((obj)=>({...obj,
        owner : "6a40acaf947f42d352c766e3",
    }));
    await Listings.insertMany(initdata.data);
    console.log("data Was Initialised");
    
};
initdb();
