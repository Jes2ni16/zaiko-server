const List = require('../models/list.model'); // Import the List model
const Client = require('../models/client.model'); // Import the Client model (if needed)

// Create a new List and associate it with a Client
const createList = async (req, res) => {
  try {
    const { clientId, list_type, unit_type, city, barangay,price, room_number, fb_link, list_owner } = req.body;

    // Fetch the client by ID
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Log the client fetched for debugging
    console.log('Client fetched:', client);

    // Create the new list with the embedded client details
    const newList = new List({
      list_type,
      unit_type,
      city,
      barangay,
      price,
      room_number,
      fb_link,
      list_owner,
      client: {
        _id: client._id,
        name: client.name,
      }
    });

    console.log('List to be saved:', newList); // Log the new list

    // Save the new list
    await newList.save();

    // Send the response
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error creating list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all lists
const getAllLists = async (req, res) => {
  try {
    const lists = await List.find();
    res.status(200).json(lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
// Get a specific list by ID
const getListById = async (req, res) => {
  try {
    const { id } = req.params;
    const list = await List.findById(id).populate('client'); // Populate client details if needed
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Update a specific list by ID
const updateList = async (req, res) => {
  const { list_type, unit_type, city, barangay,price, fb_link, room_number, list_owner, clientId } = req.body;

  try {
    // Fetch client details to embed in the list
    const client = await Client.findById(clientId);

    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const updatedList = {
      list_type,
      unit_type,
      city,
      barangay,
      price,  
      fb_link,
      room_number,
      list_owner,
      client: {
        _id: client._id,
        name: client.name,
        email: client.email,
      },
    };

    const list = await List.findByIdAndUpdate(req.params.id, updatedList, { new: true });

    res.status(200).json(list);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating list' });
  }
};

// Delete a specific list by ID
const deleteList = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedList = await List.findByIdAndDelete(id);
    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.status(200).json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Export all functions
module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
