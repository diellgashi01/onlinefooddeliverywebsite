const express = require('express');
const app = express();
const cloudinary = require('cloudinary');
const ejs = require('ejs')
const cors = require("cors");
const mysql = require('mysql')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv');
const path = require('path')

const errorMiddleware = require('./middlewares/errors')

// Setting up config file 
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' })

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "fooddelivery"
})

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(fileUpload());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

//Contact Form Stuff
app.get("/api/v1/contact/get", (req, res) => {
    const sqlGet = "SELECT * FROM contact";
    db.query(sqlGet, (error, result) => {
        res.send(result);
    })
})

app.post("/api/v1/contact/post", (req, res) => {
    const {name, email, title, message} = req.body;
    const sqlInsert = "INSERT INTO contact (name, email, title, message) VALUES (?, ?, ?, ?)";
    db.query(sqlInsert, [name, email, title, message], (error, result) =>{
        if(error) {
            console.log(error);
        }
    });
});

app.delete("/api/v1/contact/remove/:id", (req, res) => {
    const { id } = req.params;
    const sqlRemove = "DELETE FROM contact WHERE id = ?";
    db.query(sqlRemove, id, (error, result) =>{
        if(error) {
            console.log(error);
        }
    });
});

app.get("/api/v1/contact/", (req, res) =>{
    // const sqlInsert = "INSERT INTO contact (name, email, title, message) VALUES ('test name', 'test@test.com', 'test title', 'test message')";
    // db.query(sqlInsert, (err, result) =>{
    //     console.log("Error: ", err);
    //     console.log("Result: ", result)
    //     res.send("MySql");
    // })

})

// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api/v1', products)
app.use('/api/v1', auth)
app.use('/api/v1', payment)
app.use('/api/v1', order)

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app