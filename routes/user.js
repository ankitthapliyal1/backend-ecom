let express = require("express");
let bodyparser = require("body-parser");
let router = express.Router();

let User = require("../models/User");
let Orders = require("../models/Order")

router.post("/register", async (req, res) => {
    try {
        let body = req.body;
        let user = new User();

        let users = await User.find({email:body.data.email})
        // console.log(users)

        if(users.length != 0){
            res.send(JSON.stringify({ status: "failed", data: "Email already exist" }));
        }

        users = await User.find({mobileno:body.data.mobileno})
        if(users.length != 0){
            res.send(JSON.stringify({ status: "failed", data: "Mobileno already exist" }));
         }

    user.name = body.data.name;
    user.email = body.data.email;
    user.mobileno = body.data.mobileno;
    user.password = body.data.password;
    user.save().then(result => {
        res.send(JSON.stringify({ status: "success", data: result }));
    }, err => {
        res.send(JSON.stringify({ status: "failed", data: err }));
    })

       
    } 
    catch {
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
})

router.post("/login", async (req, res) => {

    try{
        let body = req.body;
        let user = await User.findOne({email:body.data.email});
        // console.log(user)
       if(user == null){
          res.end(JSON.stringify({status:"failed", data:"Email does not exist"}))
       }else{
        if(user.password == body.data.password){
            res.end(JSON.stringify({status:"success", data:user}))
        }else{
            res.end(JSON.stringify({status:"failed", data:"Invalid credentials"}))
        }
       }
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
})

router.post("/orders", async(req, res)=>{
    try{

        let body = req.body;
    let orders = await Orders.find({userid: body.data.userid});
    res.end(JSON.stringify({status:"success", data:orders}))
    }
    catch{
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
})












module.exports = router;

