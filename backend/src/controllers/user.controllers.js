import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    let avatarUrl = "";

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

    if (avatarLocalPath) {
      const cloudinaryResponse = await uploadOnCloudinary(avatarLocalPath);
      if (cloudinaryResponse) {
        avatarUrl = cloudinaryResponse.url; // Get the secure cloud URL
      }
    }

    // Create the new user in the database
    const user = await User.create({
      displayName,
      email,
      password,
      avatar: avatarUrl || "https://default-avatar-url.com/avatar.png", // Fallback if no avatar uploaded
    });

    // We never want to send the password hash back to the frontend
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      return res
        .status(500)
        .json({ message: "Something went wrong while registering the user." });
    }

    // Send the success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
      content: req.body,
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
