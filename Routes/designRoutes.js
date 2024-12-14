const express = require("express");
const { createDesign,getDesignById, searchDesigns,getAllDesign} = require("../Controllers/designController");

const router = express.Router();

router.post("/",createDesign)
// Endpoint to fetch a design by ID
router.get("/get/:id", getDesignById);

// Endpoint to search designs
router.get("/", searchDesigns);

router.get('/design', getAllDesign);

module.exports = router;
