//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const _ = require('lodash');


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const url = "mongodb://localhost:27017/todoListDB";
mongoose.connect(url).then(()=>console.log("DB Connected")).catch((error)=>console.log(error));

const itemSchema = new mongoose.Schema({
  title : String,
});

const Item = mongoose.model('item', itemSchema);

const item1 = new Item({ title: "Learm mongodb use"}) ;
const item2 = new Item({ title: "Get new skills"}) ;
const item3 = new Item({ title: "Search for a job "}) ;
let defaultItems = [item1, item2, item3];

const ListSchema = new mongoose.Schema({
    title: String,
    items: [itemSchema],
});

const List = mongoose.model('list', ListSchema);


app.get("/", function(req, res) {

    Item.find()
         .then((results)=> {
             if(results.length === 0 ){
                 Item.insertMany(defaultItems)
                     .then(
                         ()=>console.log('Item insert')
                     ).catch(
                     (error)=>console.log(error)
                 );
                 res.redirect("/");
             }else{
                 res.render("list", {listTitle: "Today", newListItems: results});
             }
         })
         .catch((error)=>console.log(error));
});

app.get("/:customListName", function (req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({title: customListName})
        .then((foundList)=>{
                if(!foundList ){
                    const list = new List({
                        title: customListName,
                        items: defaultItems,
                    });
                    list.save().then(()=>{
                        res.redirect("/" + customListName);
                    }).catch((err)=>console.log(err));
                }else{
                    res.render("list", {listTitle: customListName , newListItems: foundList.items});
                }
            }
        ).catch((err) => console.log(err));
});

app.post("/", function(req, res){

  const itemTile = req.body.newItem;
  const listTitle = req.body.list;

  const item = new Item({title: itemTile});

    if(listTitle === "Today"){
        Item.create(item).then(()=>{
            res.redirect("/");
        }).catch((error)=>{
            console.log(error);
        });
    }else{
        List.findOne({ title: listTitle })
            .then((foundList)=>{
                foundList.items.push(item);
                foundList.save().then(()=>res.redirect("/" + listTitle)).catch((err)=>console.log(err));
            }).catch((err)=>console.log(err))
    }
});

app.post("/delete", function (req, res) {
    const deletedItem = req.body.deletedItem;
    const listTitle = req.body.listTitle;
    if(listTitle === "Today"){
        Item.findByIdAndDelete(deletedItem)
            .then(()=>{
                res.redirect("/");
            }).catch(
            (error)=>console.log(error)
        );
    }else{

        //console.log(deletedItem, listTitle )
        List.findOneAndUpdate(
            {title: listTitle},
            {$pull : {items : {_id: deletedItem}}})
            .then((foundList)=>{
                //console.log(foundList + 'delete id' + deletedItem)
                res.redirect("/" + listTitle);
            }).catch((err)=>console.log(err));
    }

});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
