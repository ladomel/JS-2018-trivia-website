
let SimpleDatabase = function () {
    // nothing
};

SimpleDatabase.prototype.usedMultiple = [];
SimpleDatabase.prototype.usedGuess = [];

SimpleDatabase.prototype.getMultiple = function () {
    for (let i in questionMultiple) {
        if (!this.usedMultiple.includes(questionMultiple[i].id)) {
            this.usedMultiple.push(questionMultiple[i].id);
            return questionMultiple[i];
        }
    }
    return questionMultiple[0];
};

SimpleDatabase.prototype.getGuess = function () {
    for (let i in questionGuess) {
        if (!this.usedGuess.includes(questionGuess[i].id)) {
            this.usedGuess.push(questionGuess[i].id);
            return questionGuess[i];
        }
    }
    return questionGuess[0];
};



let questionGuess = [
    {id: 1, question: "What year did the Manhattan project take place?", answer: 1945},
    {id: 2, question: "What year did the Chernobyl disaster take place?", answer: 1986},
    {id: 3, question: "What year did Hurricane Katrina take place?", answer: 2005},
    {id: 4, question: "What year did the US enter World War II?", answer: 1941},
    {id: 5, question: "What year did World War I end?", answer: 1918},
    {id: 6, question: "What year did the Rwandan genocide take place?", answer: 1994},
    {id: 7, question: "What year did September 11th take place?", answer: 2001},
    {id: 8, question: "What year was Martin Luther King Jr. assassinated?", answer: 1968},
    {id: 9, question: "What year did the Titanic sink?", answer: 1912},
    {id: 10, question: "What year was the Berlin Wall torn down?", answer: 1989},
    {id: 11, question: "What year did Ronald Reagan die?", answer: 2004},
    {id: 12, question: "What year did the great San Francisco earthquake take place?", answer: 1906}
];

let questionMultiple = [
    {id: 1, question: "A?", answer: "A", allAnswers: ["A", "B", "C", "D"]}
];

module.exports.SimpleDatabase = SimpleDatabase;