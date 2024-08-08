const medicineModule = require('../../modules/admin/addmedicine'); // Assuming correct import

const allMedicines = async (req, res) => {
  try {
    // Assuming medicineModule exports a function named 'query'
    const medicines = await medicineModule.find();
    return res.status(200).json({ medicines });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch medicines' });
  }
};

module.exports = allMedicines;
