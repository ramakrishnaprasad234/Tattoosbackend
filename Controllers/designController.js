const Design = require("../models/design");

// Create a new design
const createDesign = async (req, res) => {
  try {
    const { artist_id, style_id, name, image, price } = req.body;
    console.log(artist_id, style_id, name, image, price)

    if ( !artist_id || !style_id || !name || !image || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newDesign = new Design({
      artist_id:artistExists._id,
      style_id,
      name,
      image,
      price,
    });
    console.log(newDesign)
    const savedDesign = await newDesign.save();
    res.status(201).json(savedDesign);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error)
  }
};


const getAllDesign = async (req, res) => {
  try {
    // Assuming `Design` is your database model
    // console.log("hi")
    const designs = await Design.find().lean(); 
    // console.log(designs)
    console.log()
    if (!designs || designs.length === 0) {
      return res.status(404).json({ message: 'Designs not found' });
    }

    res.status(200).json({ data: designs, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching designs', error: error.message });
  }
};


// Get a specific design by ID
const getDesignById = async (req, res) => {
  // console.log("hi")
  try {
    const design = await Design.findOne({ design_id: req.params.id });
    if (!design) {
      return res.status(404).json({ message: "Design not found" });
      console.log(design)
    }
    res.json(design);
    
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Search for designs with filtering and pagination
const searchDesigns = async (req, res) => {
  try {
    const { search = "",limit="", offset = 0 } = req.query;
    const filter = {
      $or: [
        { name: { $regex: search, $options: "i" } }, // Case-insensitive search by name
      ],
    };

    const designs = await Design.find(filter)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    res.json(designs);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = {
  createDesign,
  getDesignById,
  searchDesigns,
  getAllDesign,
};
