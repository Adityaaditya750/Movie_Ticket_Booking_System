const cloudinary = require("../config/cloudinary");
const User = require("../model/User");

exports.updateProfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" });
    }

    const user = await User.findById(req.user._id);

    if (user.profileImage?.public_id) {
      await cloudinary.uploader.destroy(user.profileImage.public_id);
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "movie_app_profiles"
    });

    user.profileImage = {
      url: result.secure_url,
      public_id: result.public_id
    };

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profileImage: user.profileImage.url
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.json(user);
};
