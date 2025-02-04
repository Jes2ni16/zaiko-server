const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  projectUrl: {
    type: String,
    default: '',
  },
projectDocuments: {
  type: String,
}
});

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
