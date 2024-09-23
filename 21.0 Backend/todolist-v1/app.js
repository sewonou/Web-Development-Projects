const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
//var weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let items = ["Work on My new website","Finish to learn react and nodejs","Work on Bavaria pension website"];
let workItems = [];

const day = require(__dirname + "/date.js");

app.get("/", function (req, res) {

   res.render('list', {listTitle: day.getDay(), newItems: items})
});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect("/work");
    }else{
        items.push(item);
        res.redirect("/");
    }
});

app.get("/work", function (req, res) {
    res.render('list', {listTitle: "Work", newItems: workItems})
});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
});