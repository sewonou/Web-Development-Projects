//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();

const url = "mongodb://localhost:27017/userDB";
mongoose.connect(url).then(()=>console.log("DB Connected")).catch((error)=>console.log(error));

const userSchema = new mongoose.Schema({
    email: String,
    password : String
});

const secret = process.env.SECRET;

userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = mongoose.model('user', userSchema);


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render('home')
});

app.get("/login", function (req, res) {
    res.render('login')
});

app.post('/login', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({email: username})
        .then((foundUser)=>{
            if(foundUser){
                if(foundUser.password === password){
                    res.render('secrets');
                }
            }
        }).catch((error)=>{
        res.send(error);
    });

});

app.get("/register", function (req, res) {
    res.render('register')
});

app.post("/register", function (req, res) {
    const newUser = new User({
        email: req.body.username,
        password: req.body.password,
    });

    User.create(newUser).then(()=>{
        res.render('secrets');
    }).catch((error)=>{
        res.send(error);
    });

});


app.get("/secrets", function (req, res) {
    res.render('secrets')
});

app.get("/submit", function (req, res) {
    res.render('submit')
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});