let express = require("express");
let bodyparser = require("body-parser");
let router = express.Router();

let User = require("../models/User");
let Orders = require("../models/Order");


router.post("/login", async (req, res) => {
    let body = req.body;
    let status = "";
    if (body.data.username == "admin" && body.data.password == "admin")
        status = "success"
    else
        status = "failed"
    let data = { data: { status: status } };
    res.end(JSON.stringify(data))
});

router.post("/users", async (req, res) => {
    try {
        let users = await User.find();
        res.end(JSON.stringify({ status: "success", data: users }))
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
})


router.post("/orders", async (req, res) => {
    try {
        let body = req.body;
        console.log(body.data.userid)
        if(body.data.userid == ""){ 
            let orders = await Orders.find();
        res.end(JSON.stringify({ status: "success", data: orders }))
        }
        else{
            let orders = await Orders.find({userid:body.data.userid });
        res.end(JSON.stringify({ status: "success", data: orders }))
        }
        
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
})



















module.exports = router