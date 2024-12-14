const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getProfile, updateProfile, uploadProfileImage, deleteProfileImage, deleteProfile } = require('../Controllers/profileController');
const upload = require('../utils/multerS3'); // import multer setup

// Get Profile
router.get('/profile', authMiddleware, getProfile);

// Update Profile
router.put('/profile', authMiddleware, updateProfile);

// Upload Profile Image
router.post('/profile/upload-image', authMiddleware, upload.single('image'), uploadProfileImage);

// Delete Profile Image
router.delete('/profile/delete-image', authMiddleware, deleteProfileImage);

// Delete Profile
router.delete('/profile', authMiddleware, deleteProfile);

module.exports = router;
