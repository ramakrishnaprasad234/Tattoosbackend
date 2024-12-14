
const Tattoo = require('../models/Tattoo');


exports.createTattoo = async (req, res) => {
  try {
    const { name, image, price, date, time } = req.body;
    const tattoo = new Tattoo({
       name, 
       image,
        price, 
        date, 
        time });

    await tattoo.save();
    res.status(201).json({ success: true, message: 'Tattoo booking created', tattoo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};


exports.getAllTattoos = async (req, res) => {
  try {
    const tattoos = await Tattoo.find();
    res.status(200).json({ success: true, tattoos });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get a single tattoo booking by ID
exports.getTattooById = async (req, res) => {
  try {
    const tattoo = await Tattoo.findById(req.params.id);
    if (!tattoo) {
      return res.status(404).json({ success: false, message: 'Tattoo not found' });
    }
    res.status(200).json({ success: true, tattoo });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update a tattoo booking
exports.updateTattoo = async (req, res) => {
  try {
    const tattoo = await Tattoo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tattoo) {
      return res.status(404).json({ success: false, message: 'Tattoo not found' });
    }
    res.status(200).json({ success: true, message: 'Tattoo updated', tattoo });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// Delete a tattoo booking
exports.deleteTattoo = async (req, res) => {
  try {
    const tattoo = await Tattoo.findByIdAndDelete(req.params.id);
    if (!tattoo) {
      return res.status(404).json({ success: false, message: 'Tattoo not found' });
    }
    res.status(200).json({ success: true, message: 'Tattoo deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
