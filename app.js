var fs = require("fs");
var inquirer = require("inquirer");
var jsonfile = require("jsonfile");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var cardsfile = require("./flashCards.json");
var cardsArray = [];

function prompt(){
    inquirer
        .prompt ([
        {
            type : "list",
            message : "What type of card would you like to make?",
            choices : ["Basic", "Cloze"],
            name : "cardType"
        }
        ]).then (function(answer){
            if (answer.cardType === "Basic") {
                basicCard();
            } else {clozeCard()}
        })
    
}

function basicCard() {
    inquirer
        .prompt([
            {
                type : "text",
                message : "What question would you like on the front of your card?",
                name: "front" 
            },
            {
                type : "text",
                message : "What would you like the answer on the back to be?",
                name : "back"
            },
            {
                type : "confirm",
                message : "Would you like to make another?",
                name : "confirm",
                default : "true"
            }
        ]).then (function(newBasicCard){
            var cards = new BasicCard(newBasicCard.front, newBasicCard.back);
            console.log("New card added!");
            cardsArray = fs.readFile("flashCards.json", function(err, data) {
                if (err) {
                    console.log(err)
                }
            })
            cardsArray.push(cards);
            fs.writeFile("flashCards.json", cardsArray, function(err, data) {
                if (err) {
                    console.log(err)
                }
            })
        })
};

function clozeCard() {
    inquirer
        .prompt([
            {
                type : "text",
                message : "What question would you like on your card?",
                name: "front" 
            },
            {
                type : "text",
                message : "What would you like the answer phrase to be?",
                name : "back"
            },
            {
                type : "confirm",
                message : "Would you like to make another?",
                name : "confirm",
                default : "true"
            }
        ])
}


prompt();


