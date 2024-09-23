const { MongoClient } = require("mongodb");
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const dbConnect = async() => {
    try{
        // connection to mongodb
        await client.connect();
        console.log("DB connected successfully ");
        // create database
        const db = client.db('school');
        // create collection
        const students = db.collection("students");
        // create documents
        /*const student1 = await students.insertOne({
            name: "Jonh Doe",
            age: 22,
            city: "Lomé"
        });*/
        /*const students2 = await students.insertMany([{name: "Emmanuel KWANSA", age: 20, city: "Dapaong"}, {name: "Lea ALITI", age: 18, city: "Kara"}]);*/

        // find all documents
        //const allStudents = await students.find().toArray();
        //update record
        const updateStudent = await students.updateOne(
            {
                name:"Emmanuel"
            },
            {
                $set:{
                    name: "Kossivi"
                }
            });
        console.log(updateStudent);
    }
    catch(error){
        console.log(error);
    }
};

dbConnect();