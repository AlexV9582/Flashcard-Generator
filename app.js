var fs = require("fs");
var inquirer = require("inquirer");
var jsonfile = require("jsonfile");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var cardsfile = require("./flashCards.json");
var newCard = [];
// var basicCards = [];
// var clozeCards = [];

/*function getCards(){fs.readFile("flashCards.json", "utf-8", function(err, data){
        if(err) {
            throw err;
        }
        basicCards = cardsfile.basic;
        clozeCards = cardsfile.cloze;
        console.log(basicCards);
    });
}*/

// getCards();
// console.log(JSON.parse(cards));

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
        
            fs.readFile("flashCards.json", "utf-8", function(err, data) {
                if (err) {
                    console.log(err)
                }
            
                if (data) {
                    var my_BasicArray = JSON.parse(data);

                    var obj = {
                        front: cards.front,
                        back : cards.back
                    }
                    my_BasicArray["basic"].push(obj)
                    
                    var test = JSON.stringify(my_BasicArray)
                    
                }
                
                fs.writeFile("flashCards.json", test, function(err, data) {
                    if (err) {
                        console.log(err)
                    }
                })
                if (newBasicCard.confirm){
                    basicCard()
                }
            })
            
            
        })
};

function clozeCard() {
    inquirer
        .prompt([
            {
                type : "text",
                message : "What text would you like on your card?",
                name: "text" 
            },
            {
                type : "text",
                message : "What phrase would you like to remove from the question?",
                name : "cloze"
            },
            {
                type : "confirm",
                message : "Would you like to make another?",
                name : "confirm",
                default : "true"
            }
        ]).then (function(newClozeCard) {
            var statement = newClozeCard.text.split(" ")
            for (var i = 0; i < statement.length; i++) {
                if (statement[i] == newClozeCard.cloze) {
                    statement.splice(i, 1);
                    var clozeStatement = statement.join(" ")
                }
            }
            var cards = new ClozeCard(clozeStatement, newClozeCard.cloze.toLowerCase());
            console.log("New card added!");

            fs.readFile("flashCards.json", "utf-8", function(err, data) {
                if (err) {
                    console.log(err)
                }
                if (data) {
                    var clozeArray = JSON.parse(data);
                    var obj = {
                        front : cards.text,
                        back : cards.cloze
                    }
                    console.log(obj)
                    clozeArray["cloze"].push(obj)
                    var test = JSON.stringify(clozeArray)
                }
                fs.writeFile("flashCards.json", test, function(err, data){
                    if (err){
                        console.log(err);
                    }
                })
                if(newClozeCard.confirm){
                    clozeCard()
                }
            })
        })
}


prompt();


