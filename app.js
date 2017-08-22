var fs = require("fs")
var inquirer = require("inquirer")
var basicCard = require("./BasicCard.js")
var clozeCard = require("./ClozeCard.js")

inquirer
    .prompt ([{
        type : "list",
        message : "What type of card would you like to make?",
        choices : ["Basic", "Cloze"],
        name : "cardType"
    },
    {
        type : "text",
        message : "What question would you like on the front of your card?",
        name: "cardFront" 
    },
    {
        type : "text",
        message : "What would you like the answer on the back to be?",
        name : "cardBack"
    }])