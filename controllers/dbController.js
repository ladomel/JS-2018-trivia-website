// var mongoose = require("mongoose");
//
// mongoose.connect('mongodb://localhost/trivia');
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {});
//
// var question = mongoose.Schema({
//     question: Object,
//     user: String
// });
// var QueationModel = mongoose.model("questions", question);
//
// var user = mongoose.Schema({
//     name: String,
//     password: String
// });
// var UserModel = mongoose.model("users", user);
//
// exports.saveQuestion = function(question, username) {
//     return new QueationModel({
//         question: question,
//         user: username
//     }).save(function(){});
// };
//
// exports.saveUser = function(name, password) {
//     return new UserModel({
//         name: name,
//         password: password
//     }).save(function(){});
// };
//
// exports.getUser = function(name) {
//     let z = await UserModel.find({name: name}, function(err,data){
//         if (err) return null;
//         return data[0];
//     });
// };