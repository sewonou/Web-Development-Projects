
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app =  express() ;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url = "mongodb://localhost:27017/wikiDB";
mongoose.connect(url).then(()=>console.log("DB Connected")).catch((error)=>console.log(error));

const articleSchema = new mongoose.Schema({
    title : String,
    content: String,
});

const Article = mongoose.model('Article', articleSchema);

app.get('/articles', function (req, res) {

    Article.find()
        .then((foundArticles)=> {
            /*let jsonArticles = JSON.stringify(foundArticles);*/
            res.send(foundArticles);
        })
        .catch((error)=>console.log(error));
});

app.route('/articles')
    .post( function (req, res) {
        const newArticle = Article({
            title : req.body.title,
            content : req.body.content,
        });

        Article.create(newArticle)
            .then(()=>{
            res.send("Article successfully added !")
        }).catch((error)=>{
            console.log(error);
        });
    })

    .delete(function (req, res) {
        Article.deleteMany()
            .then(()=>{
                res.send("All the articles are delete ! ")
            })
            .catch((error)=>{
                console.log(error);
            })
    })
;

app.route('/articles/:articleTitle')
    .get(function (req, res) {
        const articleTitle = req.params.articleTitle;

        Article.findOne({title : articleTitle})
            .then((foundArticle)=>{
                if(foundArticle){
                    res.send(foundArticle);
                }else{
                    res.send('There is no article matches that title !');
                }
            })
            .catch((error)=>{
                console.log(error);
            })

    })
    .put(function (req, res) {
        const articleTitle = req.params.articleTitle;
        Article.findOneAndUpdate(
            {title : articleTitle},
            {
                title : req.body.title,
                content: req.body.content
            },
            {new: true})
            .then((updatedArticle)=>{
                res.send('Article is updated succesfully');
            })
            .catch(error => console.log(error));
    })
    .patch(function (req, res) {
        const articleTitle = req.params.articleTitle;
        Article.updateOne(
            {title : articleTitle},
            {$set : req.body})
            .then((updatedArticle)=>{
                res.send('Article is patched the succesfully');
            })
            .catch(error => console.log(error));
    })
    .delete(function (req, res) {
        const articleTitle = req.params.articleTitle;
        Article.deleteOne({title: articleTitle}).then(()=>{
            res.send('Article was deleted successfully !')
        }).catch((error) =>{
            res.send(error);
        })
    })
;

app.listen(3000, function() {
    console.log("Server started on port 3000");
});


