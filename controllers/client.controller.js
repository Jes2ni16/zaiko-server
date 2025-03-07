// controllers/client.controller.js
const Client = require('../models/client.model');

// Create a new client
const createClient = async (req, res) => {
  try {
    const { name, email, phone, address, background, fb, tiktok, youtube,website,linked,instagram, background_mobile, image, image_mobile, projects } = req.body;

    const baseName = name.split(' ')[0].toLowerCase();

    const existingClients = await Client.find({ url: new RegExp(`^${baseName}\\d*$`, 'i') });

    const nextNumber = existingClients.length + 1;

    const url = `${baseName}${nextNumber}`;

    const newClient = new Client({
      name,
      email,
      phone,
      address,
      fb,
      tiktok,
      youtube,
      website,
      linked,
      instagram,
      background,
      background_mobile,
      projects,
      image, image_mobile ,
      url, 
    });

    const savedClient = await newClient.save();
    res.status(201).json({ message: 'Client created successfully', client: savedClient });
  } catch (err) {
    console.error('Error creating client:', err);
    res.status(400).json({ error: 'Error creating client', details: err.message });
  }
};

// Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (err) {
    res.status(400).json({ error: 'Error retrieving clients', details: err.message });
  }
};

// Get client by URL
const getClientByUrl = async (req, res) => {
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
const getClientById = async (req, res) => {
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
const updateClient = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address, background_mobile, background, fb,linked, tiktok,website, youtube, instagram, image, image_mobile, projects } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.address = address;
    client.fb = fb;
    client.website = website;
    client.tiktok = tiktok;
    client.youtube = youtube;
    client.instagram = instagram;
    client.linked = linked;
    client.background_mobile = background_mobile;
    client.background = background;
    client.image = image; 
    client.image_mobile = image_mobile; 
    client.projects = projects; 
    
    // Save the updated client information
    await client.save();
    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'Error updating client', error });
  }
};

// Delete a client by ID
const deleteClient = async (req, res) => {
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

module.exports = {
  createClient,
  getClients,
  getClientByUrl,
  getClientById,
  updateClient,
  deleteClient,
};
