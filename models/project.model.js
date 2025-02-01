const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  projectUrl: {
    type: String,
    default: '',
  },
  projectImg: { type: String },
  projectLocation: { type: String },
  title: { type: String },
  description: { type: String },
  
  location: {
    locationText: { type: String }, // for the main location text
    descriptions: [
      {
        title: { type: String },
        ul: [{ type: String }],
      }
    ], // array of descriptions
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
    details: [
      {
        title: { type: String },
        ul: [{ type: String }],
        imgs: [{ type: String }],
      }
    ], 
  },

  buildingFeatures: {
    text: { type: String },
    details: [
      {
        title: { type: String },
        ul: [{ type: String }],
      }
    ], 
  },

  unitDeliverable: {
    text: { type: String },
        ul: [{ type: String }],
        imgs: [{ type: String }],
      },
      floorPlan:{
        type:[String]
      },
  
  siteUpdate: {
    title: { type: String },
    imgs: [{ type: String }],
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
