import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// create new instance of the mongoose.schema. the schema takes an
// object that shows the shape of your database entries.
const itemSchema = new Schema({
  item: String,
  isDone: Boolean,
});

// export our module to use in server.js
export default mongoose.model('item', itemSchema);