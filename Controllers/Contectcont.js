const Contact = require('../models/Contect');

// Save a new contact message
exports.createContact = async (req, res) => {
    try {
        const { name, email,phone, message } = req.body;
        console.log(name, email,phone, message)

        // Validate input
        if (!name || !email ||!phone || !message) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        const contact = new Contact({ name, email, phone, message });
        await contact.save();

        res.status(201).json({ message: 'Contact message saved successfully!' });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch all contact messages (for admin use)
exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
