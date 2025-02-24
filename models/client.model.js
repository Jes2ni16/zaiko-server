const mongoose = require('mongoose');
const { Schema } = mongoose; // Extract Schema

const clientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  fb: {
    type:String
  },
  tiktok: {
    type:String
  },
  instagram: {
    type:String
  },
  youtube: {
    type:String,
  },
  website: {
    type:String,
  },
  linked: {
    type:String,
  },
  background: {
    type:String,
  },
  background_mobile : {
    type:String
  },
  image: {
    type:String,
  },
  projects:
   { type: [String], default: [] },
  image_mobile: {
    type:String,
  },
  url:{
    type:String
  },

  lists: [{ type: Schema.Types.ObjectId, ref: 'List' }] // Reference to List documents
}, { timestamps: true });

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
