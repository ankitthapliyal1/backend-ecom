let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, require:true},
        email:{type:String, require:true},
         mobileno:{type:String, require:true},
        password:{type:String, require:true},
       
       
    }
);

let User = mongoose.model("users", schema);

module.exports = User