//var generateName = require("sillyname");
import generateName from "sillyname";
import {randomSuperhero} from "superheroes";
var sillyName = generateName();
var superHeroName = randomSuperhero();
console.log(`My name is ${sillyName}`);
console.log(`I am ${superHeroName}!`);