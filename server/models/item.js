var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const itemSchema = new Schema({
  item: String,
  isDone: Boolean,
});

// export our module to use in server.js
//'task' SUPER IMPORTANT WHEN USING MONGOOSE.MODEL 
//YOU MUST EXPORT WITH THE COLLECTION NAME aka 'task' for tasks
var Model = mongoose.model('task', itemSchema);
module.exports = Model;