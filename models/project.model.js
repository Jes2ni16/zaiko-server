const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  projectUrl: {
    type: String,
    default: '',
  },
  projectImg: { type: String, default: '' },
  projectLocation: { type: String, default: '' },
  title: { type: String, required: false },
  description: { type: String, default: '' },

  location: {
    locationText: { type: String, default: '' }, // Main location text
    descriptions: [
      {
        title: { type: String, default: '' },
        ul: [{ type: String, default: '' }], // List items
      },
    ],
    img: { type: String, default: '' },
  },

  projectDetails: {
    ul: [{ type: String, default: '' }],
    imgs: [{ type: String, default: '' }],
  },

  amenitiesFacilities: {
    description: { type: String, default: '' },
    ul: [{ type: String, default: '' }],
    imgs: [{ type: String, default: '' }],
  },

  unitDetails: {
    text: { type: String, default: '' },
    details: [
      {
        title: { type: String, default: '' },
        ul: [{ type: String, default: '' }],
        imgs: [{ type: String, default: '' }],
      },
    ],
  },

  unitDeliverable: {
    text: { type: String, default: '' },
    ul: [{ type: String, default: '' }],
    imgs: [{ type: String, default: '' }],
  },

  siteUpdate: {
    title: { type: String, default: '' },
    imgs: [{ type: String, default: '' }],
  },
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
