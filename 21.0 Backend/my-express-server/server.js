const express = require("express");

const app = express();
app.get("/", function (request, response) {
    response.send("Hello world");
});

app.get("/contact", function (req, res) {
    res.send("contact me on up@stream.io !");
});

app.get("/about", function (req, res) {
    res.send("<h1> I'm Kossivi a full stack web developer </h1><p> I'll help you develop your web application</p>")
});

app.get("/hobbies", function (req, res) {
    res.send("<ul><li>Coffee</li><li>Game</li><li>Read</li></ul>")
});



app.listen(3000, function () {
    console.log("Server start working on port 3000");
});