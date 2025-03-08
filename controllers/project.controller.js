
const Property = require('../models/project.model'); 
const cloudinary = require('../config/cloudinary'); 


// Create a new property
const createProperty = async (req, res) => {
  try {
    // Log the incoming request data
    console.log('Request Body:', req.body); // Log body data
    console.log('Uploaded Files:', req.files); // Log files to see if they are coming through

    // Ensure files exist
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imageUrls = [];

    // Upload general property images (main image)
    if (req.files.image) {
      const images = req.files.image;

      const uploadPromises = Array.isArray(images) 
        ? images.map((image) => {
            return new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { folder: 'properties' },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result.secure_url); // Resolve with Cloudinary URL
                }
              ).end(image.data); // Ensure you access the file data properly
            });
          })
        : [new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { folder: 'properties' },
              (error, result) => {
                if (error) reject(error);
                else resolve(result.secure_url);
              }
            ).end(images.data); // Handle single image case
          })];

      // Wait for the image uploads to finish and gather URLs
      const uploadedImageUrls = await Promise.all(uploadPromises);
      console.log('Uploaded Image URLs:', uploadedImageUrls);

      // Add the uploaded image URLs to the property data
      imageUrls.push(...uploadedImageUrls);
    }

    const propertyData = {
      ...req.body,
      image: imageUrls,  // Save the image URLs in `image` field
    };

    // Handle nested image arrays (e.g., `location.images`, `amenities.images`, etc.)
    const fieldsWithImages = [
      'location',
      'amenities',
      'building',
      'house_models',
      'sample_computation',
      'deliverables',
      'requirements',
    ];

    for (let field of fieldsWithImages) {
      if (req.files[field]) {
        const fieldImages = req.files[field];
        const uploadPromises = Array.isArray(fieldImages)
          ? fieldImages.map((image) => {
              return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                  { folder: `properties/${field}` },
                  (error, result) => {
                    if (error) reject(error);
                    else resolve(result.secure_url);
                  }
                ).end(image.data);
              });
            })
          : [new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { folder: `properties/${field}` },
                (error, result) => {
                  if (error) reject(error);
                  else resolve(result.secure_url);
                }
              ).end(fieldImages.data);
            })];

        // Wait for the uploads and store the URLs in the respective field
        const uploadedFieldUrls = await Promise.all(uploadPromises);
        propertyData[field] = {
          ...propertyData[field],  // Retain existing field data
          images: uploadedFieldUrls,  // Add image URLs
        };
      }
    }

    // Save property to MongoDB
    const property = new Property(propertyData);
    await property.save();

    res.status(201).json({
      message: 'Property created successfully',
      property,
    });
  } catch (error) {
    console.error('Error creating property:', error); // Log errors for debugging
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
