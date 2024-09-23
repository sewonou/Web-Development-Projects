const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/school2";

mongoose.connect(url)
    .then(()=>console.log("Db connected"))
    .catch((error)=>console.log(error.message));

// create a schema
const studentSchema = new mongoose.Schema({
    name: String,
    city: String,
    course: Array,
    isMarried: Boolean,
    age: Number,
});

const Student = mongoose.model('Student', studentSchema);

Student.create({
    name: "Dado",
    city: "Lome",
    course: ["POO", "Javascript", "Database"],
    isMarried: true,
    age: 23,
})
    .then((student)=>console.log(student))
    .catch((error)=>console.log(error));