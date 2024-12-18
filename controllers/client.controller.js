// controllers/client.controller.js
const Client = require('../models/client.model');

// Create a new client
exports.createClient = async (req, res) => {
  try {
    const { name, email, phone, address,  background ,fb,tiktok, youtube,instagram, backgroundMobile, } = req.body;

    // Extract the base name (first word before any space) for the URL
    const baseName = name.split(' ')[0].toLowerCase();

    // Find existing clients with a similar URL pattern
    const existingClients = await Client.find({ url: new RegExp(`^${baseName}\\d*$`, 'i') });

    // Determine the next incremental number
    const nextNumber = existingClients.length + 1;

    // Generate the unique URL
    const url = `${baseName}${nextNumber}`;

    // Create a new client with the provided details
    const newClient = new Client({
      name,
      email,
      phone,
      address,
      fb,tiktok, youtube,instagram, 
      background: background  || null,
      background_mobile: backgroundMobile || null, // Use the URL provided or set to null
      url, // Save the generated URL
  
    });

    // Save the client in the database
    const savedClient = await newClient.save();
    res.status(201).json({ message: 'Client created successfully', client: savedClient });
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(400).json({ error: 'Error creating client', details: err.message });
  }
};

// Get all clients
exports.getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving clients', details: err.message });
  }
};


exports.getClientByUrl = async (req, res) => {
  try {
    const { url } = req.params;
    const client = await Client.findOne({ url: url }); 
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// Get a single client by ID
exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json(client);
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving client', details: err.message });
  }
};

// Update a client by ID
exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, backgroundMobile,  background ,fb, tiktok, youtube, instagram  } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Update client fields
    client.name = name;
    client.email = email;
    client.phone = phone;
    client.address = address;
    client.fb = fb;
    client.tiktok = tiktok;
    client.youtube = youtube;
    client.instagram = instagram;
      client.background_mobile = backgroundMobile;
      client.background = background ; // Save the URL string in the database
    

    // Save the updated client information
    await client.save();
    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// Delete a client by ID
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: 'Error deleting client', details: err.message });
  }
};
