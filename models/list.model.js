const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = new Schema({
  list_type: {
     type: String
  },
  unit_type: { 
    type: String 
},
city:{
    type:String,
},
barangay:{
    type:String
},
price:{
    type:String
},
fb_link:{
    type:String
},
room_number:{
    type:String
},
list_owner: {
    type:String
},
client: { 
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
    name: String,
    email: String,
    url:String,
    // Include any other fields you want to embed here
  }
},{ timestamps: true });

const List = mongoose.model('List', listSchema);
module.exports = List;