let express = require("express");
let bodyparser = require("body-parser");
let router = express.Router();

let Product = require("../models/Product");
let fs = require("fs");

const { uploadFile, deletDiskFile } = require('../utils/util');


//save product and update

router.post("/save", async (req, res) => {
    try {

        console.log(req.body)
        console.log(req.files)

        let { id, pcid, name, description, specification, mrp, price, varieties, instock, isactive } = req.body;

        let product

        if (id) {
            //update & edit
            product = await Product.findById(id);

            product.pcid = pcid,
            product.name = name,
            product.description = description,
            product.specification = specification,
            product.mrp = mrp,
            product.price = price,
            product.varieties = varieties,
            product.instock = instock,
            product.isactive = isactive
            
            if (req.files) {
                let filename = product.imagepath;
                  
                      uploadFile(req, filename, res);
                    
                }
                product = await product.save();

        }
        else {
            let filename = "products/" + req.files.file.name;
            uploadFile(req, filename, res);

            //add new
            let data = {
                pcid: pcid,
                name: name,
                description: description,
                specification: specification,
                mrp: mrp,
                price: price,
                varieties: varieties,
                instock: instock,
                isactive: isactive,
                imagepath:filename
            }

            product = await Product.create(data)
        }

        if (product) {
            res.end(JSON.stringify({ status: "success", data: product }));
        }
        else {
            res.end(JSON.stringify({ status: "failed", data: err }));
        }


    }
    catch (error) {
        console.log(error)
        res.end(JSON.stringify({ status: "failed", data: "something went wrong" }));
    }
});




router.post("/list", async (req, res) => {
    try {
        let body = req.body;
        let pcid = body.data.pcid;
        if (pcid == "") {
            let products = await Product.find();
            res.end(JSON.stringify({ status: "success", data: products }))
        }
        else {
            let products = await Product.find({ pcid: pcid });
            res.end(JSON.stringify({ status: "success", data: products }))
        }

    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));

    }
})

//get 
router.post("/get", async (req, res) => {
    try {
        let body = req.body;
        let products = await Product.findById(body.data.id);
        res.end(JSON.stringify({ status: "success", data: products }));

    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));

    }
})

//delete
router.post("/delete", async (req, res) => {
    try {
        let body = req.body;
        let data =  await Product.findById(body.data.id);
        deletDiskFile("assets/"+ data.imagepath);

        await Product.findByIdAndDelete(body.data.id);
         res.end(JSON.stringify({ status: "success" , message:"Deleted Successfully" }));
    }
    catch(error) {
        console.log(error)
        res.end(JSON.stringify({ status: "failed", data: "something went Wrong" }));
    }
});

// add variety
router.post("/savevariety", async (req, res) => {
    try {
        let body = req.body;
        let product = new Product();
        product = await Product.findById(body.data.id);
        product.varieties.push(body.data.variety);
        product.save().then(result => {
            res.send(JSON.stringify({ status: "success", data: result }));
        }, err => {
            res.send(JSON.stringify({ status: "failed", data: err }));
        });
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});

//delete variety

router.post("/deletevariety", async (req, res) => {
    try {
        let body = req.body;
        let product = new Product();
        product = await Product.findById(body.data.id);
        let varieties = [];
        for (let i = 0; i < product.varieties.length; i++) {
            if (product.varieties[i].color != body.data.variety.color || product.varieties[i].size != body.data.variety.size) {
                varieties.push(product.varieties[i]);
            }
        }
        product.varieties = varieties;
        product.save().then(result => {
            res.send(JSON.stringify({ status: "success", data: result }));
        }, err => {
            res.send(JSON.stringify({ status: "failed", data: err }));
        });
    }
    catch {
        res.end(JSON.stringify({ status: "failed", data: "Something went wrong" }));
    }
});


module.exports = router



























