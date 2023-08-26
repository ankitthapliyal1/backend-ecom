let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, require:true},
        srno:{type:Number, require:true},
        imagepath:{type:String}
    }
);

let Productcategory = mongoose.model("productcategories", schema);

module.exports = Productcategory