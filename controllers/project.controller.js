const Property = require('../models/project.model');

// Create a new property
const createProperty = async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getPropertyByUrl = async (req, res) => {
  try {
    const { projectUrl } = req.params;
    
    if (!projectUrl) {
      return res.status(400).json({ message: 'Project URL is required' });
    }

    // Log for debugging
    console.log('Fetching project:', projectUrl);

    const project = await Property.findOne({ projectUrl });
    
    // Log for debugging
    console.log('Found project:', project ? 'yes' : 'no');

    if (!project) {
      return res.status(404).json({ 
        message: `Project "${projectUrl}" not found` 
      });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      message: 'Internal server error',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a property by ID
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createProperty,
  getProperties,
  getPropertyByUrl,
  updateProperty,
  deleteProperty,
};
