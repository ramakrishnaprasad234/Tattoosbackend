const Profile = require('../models/Profile');
const AWS = require('aws-sdk');

// Configure AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Helper function to extract the S3 key from the URL
const extractKeyFromUrl = (url) => {
  const urlParts = url.split('/');
  return urlParts.slice(3).join('/'); // Assumes the format https://<bucket>.s3.<region>.amazonaws.com/<key>
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ profile, message: 'success' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  const { name, email, mobile } = req.body;

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { name, email, mobile },
      { new: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(updatedProfile);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
};

// Upload Profile Image
const uploadProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (profile && profile.image) {
      const imageKey = extractKeyFromUrl(profile.image);
      const deleteParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: imageKey };
      await s3.deleteObject(deleteParams).promise();
      console.log('Old image deleted from S3');
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { userId: req.userId },
      { image: req.file.location },
      { new: true }
    );

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading image', error: error.message });
  }
};

// Delete Profile Image
const deleteProfileImage = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.userId });

    if (profile && profile.image) {
      const imageKey = extractKeyFromUrl(profile.image);
      const deleteParams = { Bucket: process.env.AWS_BUCKET_NAME, Key: imageKey };

      await s3.deleteObject(deleteParams).promise();
      console.log('Image deleted from S3');

      const updatedProfile = await Profile.findOneAndUpdate(
        { userId: req.userId },
        { image: null },
        { new: true }
      );

      res.status(200).json(updatedProfile);
    } else {
      res.status(404).json({ message: 'No profile image to delete' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting image', error: error.message });
  }
};

// Delete Profile
const deleteProfile = async (req, res) => {
  try {
    const deletedProfile = await Profile.findOneAndDelete({ userId: req.userId });

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting profile', error: error.message });
  }
};

module.exports = { getProfile, updateProfile, uploadProfileImage, deleteProfileImage, deleteProfile };
