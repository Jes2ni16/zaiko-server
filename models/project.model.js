const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  projectUrl:{
    type:String,
    default: ''
  },
  title: { type: String },
  description: { type: String},
  location: {
    description1: {
      title: { type: String },
      ul: [{ type: String }],
    },
    description2: {
      title: { type: String },
      ul: [{ type: String }],
    },
    description3: {
      title: { type: String },
      ul: [{ type: String }],
    },
    description4: {
      title: { type: String },
      ul: [{ type: String }],
    },
    img: { type: String },
  },
  projectDetails: {
    ul: [{ type: String }],
    imgs: [{ type: String }],
  },
  amenitiesFacilities: {
    description: { type: String },
    ul: [{ type: String }],
    imgs: [{ type: String }],
  },
  unitDetails: {
    text: { type: String },
    details1: {
      title: { type: String },
      ul: [{ type: String }],
      imgs: [{ type: String }],
    },
    details2: {
      title: { type: String },
      ul: [{ type: String }],
      imgs: [{ type: String }],
    },
    details3: {
      title: { type: String },
      ul: [{ type: String }],
      imgs: [{ type: String }],
    },
  },
  siteUpdate: {
    title: { type: String },
    imgs: [{ type: String }],
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;