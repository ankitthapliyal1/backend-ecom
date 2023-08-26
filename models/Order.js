let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        userid:{type:String, require:true},
        orderdate:{type:Date, require:true},
        address:{type:String, require:true},
        city:{type:String, require:true},
        state:{type:String, require:true},
        pincode:{type:Number, require:true},
        totalamount:{type:Number, require:true},
        shipmentamount:{type:Number, require:true},
        billamount:{type:Number, require:true},
        status:{type:String, require:true},
        products:[]
    }
);

let Order = mongoose.model("orders", schema);

module.exports = Order