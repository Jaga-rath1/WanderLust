const { required } = require("joi");
const mongoose = require("mongoose");
const passportLocalmongoose = require("passport-local-mongoose").default;
let userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
});
userSchema.plugin(passportLocalmongoose);
let User = mongoose.model("User",userSchema);
module.exports = User;