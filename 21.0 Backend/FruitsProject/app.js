const mongoose = require('mongoose');
const url = 'mongodb://127.0.0.1:27017/fruitsDb';
mongoose.connect(url)
    .then(()=>console.log("DB FruitDB connected"))
    .catch((error)=>console.log(error.message));

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please the name is required'],
    },
    rating: {
        type: Number,
        min: 1 ,
        max: 10,
    },
    review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);
Fruit.create({
    rating: 5,
    review: "Awesome fruit need to be test"
})
    .then((fruit)=>console.log(fruit))
    .catch((error)=>console.log(error));

const apple = {
    name: "Apple",
    rating: 12,
    review: "This fruits is not so special but it is exceptional."
};

const strawberry = {
    name: "Strawberry",
    rating: 12,
    review: "Passion and love are in the air when touch this fruit."
};

/*Fruit.insertMany([apple, strawberry])
    .then((fruits)=>console.log(fruits))
    .catch((error)=>console.log(error));*/


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
});

const Person = mongoose.model("Person", personSchema);
/*Person.create({
    name: "Adeodat",
    age: 35,
})
    .then((person)=>console.log(person))
    .catch((error)=>console.log(error));
*/
Fruit.find()
    .then((fruits)=>{
        mongoose.connection.close();
        fruits.forEach((fruit) => {
            console.log("Fruit name : " + fruit.name);
        })
    })
    .catch((error)=>console.log(error));

/*
Fruit.updateOne({_id: "66d20ac5f594bd7d6582d732"}, {name: "Peach"})
    .then(()=>console.log("Fruit was updated"))
    .catch((error)=>console.log(error));*/
Fruit.deleteOne({_id: "66d20ac5f594bd7d6582d732"})
    .then(()=>console.log("Fruit was deleted"))
    .catch((error)=>console.log(error));
