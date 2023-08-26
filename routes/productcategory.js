let express = require("express");
let bodyparser = require("body-parser");
let Productcategory = require("../models/prodectcategory");
let fs = require("fs");
let path = require("path");
const multer = require('multer')



const { uploadFile, deletDiskFile } = require('../utils/util');

let router = express.Router();


router.post("/save", async (req, res) => {
    try {
        let { name, srno, id } = req.body;
        let doc
        if (id) {
            //update 
            doc = await Productcategory.findById(id);
            //old filename
            doc.name = name;
            doc.srno = srno;

            if (req.files) {
            let filename = doc.imagepath;
              
                  uploadFile(req, filename, res);
                
            }
            doc = await doc.save();

        } else {
            let filename = "productcategories/" + req.files.file.name;
             uploadFile(req, filename, res);
            
            //add new    
            let data = {
                name: name,
                srno: srno,
                imagepath: filename

            }
            doc = await Productcategory.create(data)

        }

        if (doc) {
            res.end(JSON.stringify({ status: "success", data: doc }));
        }
        else {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }
    }
    catch (error) {
        // console.log(error)
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});





router.post("/list", async (req, res) => {
    try {
        let productcategories = await Productcategory.find();
        res.end(JSON.stringify({ status: "success", data: productcategories }));
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});

router.post("/get", async (req, res) => {
    try {
        let body = req.body;
        let productcategory = await Productcategory.findById(body.data.id);
        res.end(JSON.stringify({ status: "success", data: productcategory }));
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});

router.post("/delete", async (req, res) => {
    try {
        console.log(res.body)
        let body = req.body;
       let data =  await Productcategory.findById(body.data.id);
        deletDiskFile("assets/"+ data.imagepath);

        await Productcategory.findByIdAndDelete(body.data.id);
        
        res.end(JSON.stringify({ status: "success" , message:"Deleted Successfully" }));
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});

module.exports = router;