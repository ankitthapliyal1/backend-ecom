const express = require("express");
const mongoose = require("mongoose");

const fileupload = require('express-fileupload');

const app = express();

// Middleware
app.use(express.static("assets"));
app.use(express.json({ limit: '50mb' }));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "POST, GET, PUT, PATCH, DELETE");
        return res.status(200).json({});
    }

    next();
});

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/ecommerceproject", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", error => console.log(error));
db.on("open", () => console.log("MongoDb Connection Established"));

//file uploaad
app.use(fileupload({
    createParentPath: true
  }));
  
// Routes
app.get("/", (req, res) => {
    res.send("Welcome to e-commerce backend");
});

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));



// Error Handling Middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong!');
// });

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}/`);
});
