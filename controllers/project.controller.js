
const Property = require('../models/project.model'); 
const cloudinary = require('../config/cloudinary'); 


// Create a new property
const createProperty = async (req, res) => {
  try {
    // Log the incoming request data
    console.log('Request Body:', req.body); // Log body data
    console.log('Uploaded Files:', req.files); // Log files to see if they are coming through

    // Ensure files exist
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = [];

    // Assuming images are in `req.files` (multer or express-fileupload)
    const images = req.files;

    // Upload each image to Cloudinary
    const uploadPromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'properties' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url); // Resolve with Cloudinary URL
          }
        ).end(image.buffer);
      });
    });

    // Wait for all the uploads to complete and gather URLs
    const uploadedImageUrls = await Promise.all(uploadPromises);
    console.log('Uploaded Image URLs:', uploadedImageUrls); // Log the URLs returned by Cloudinary

    // Prepare the data for saving to MongoDB
    const propertyData = {
      ...req.body,
      image: uploadedImageUrls,  // Save the image URLs in `image` field
    };

    // Handle nested image arrays (e.g., `location.images`, `amenities.images`, etc.)
    if (req.files.location && req.files.location.length > 0) {
      const locationImages = req.files.location.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/location' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.location.images = await Promise.all(locationImages);
    }

    if (req.files.amenities && req.files.amenities.length > 0) {
      const amenitiesImages = req.files.amenities.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/amenities' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.amenities.images = await Promise.all(amenitiesImages);
    }

    if (req.files.building && req.files.building.length > 0) {
      const buildingImages = req.files.building.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/building' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.building.images = await Promise.all(buildingImages);
    }

    if (req.files.house_models && req.files.house_models.length > 0) {
      const houseModelsImages = req.files.house_models.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/house_models' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.house_models.images = await Promise.all(houseModelsImages);
    }

    if (req.files.sample_computation && req.files.sample_computation.length > 0) {
      const sampleComputationImages = req.files.sample_computation.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/sample_computation' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.sample_computation.images = await Promise.all(sampleComputationImages);
    }

    if (req.files.deliverables && req.files.deliverables.length > 0) {
      const deliverablesImages = req.files.deliverables.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/deliverables' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.deliverables.images = await Promise.all(deliverablesImages);
    }

    if (req.files.requirements && req.files.requirements.length > 0) {
      const requirementsImages = req.files.requirements.map((image) => {
        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'properties/requirements' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(image.buffer);
        });
      });
      propertyData.requirements.images = await Promise.all(requirementsImages);
    }

    // Save property to database
    const property = new Property(propertyData);
    await property.save();

    res.status(201).json({
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    console.error('Error creating property:', error); // Log errors if they occur
    res.status(500).json({ message: 'Error creating property', error: error.message });
  }
};

// Get all properties
const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties from the database
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error: error.message });
  }
};


const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id); 
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error: error.message });
  }
};

// Update a property by ID
const updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true }); 
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property updated successfully', property });
  } catch (error) {
    res.status(500).json({ message: 'Error updating property', error: error.message });
  }
};


const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id); 
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.status(200).json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting property', error: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperties,
  getPropertyById,
  updateProperty,
  deleteProperty
};
