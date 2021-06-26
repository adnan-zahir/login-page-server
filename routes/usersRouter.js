const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Login
router.post("/login", (req, res) => {
  console.log("Login request recieved");
});
// Register
router.post("/register", async (req, res) => {
  console.log("Register request recieved");
  const { username, email, password } = req.body;
  const user = new User({
    username,
    email,
    password,
  });
  try {
    const foundUsername = await searchUser("username", username);
    const foundEmail = await searchUser("email", email);

    if (foundUsername || foundEmail)
      throw new Error("Username or Email is already taken");

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Get Credentials
router.get("/:id", async (req, res) => {
  console.log("Getting user credentials");
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
// Update User
router.patch("/:id", (req, res) => {
  console.log("Updating user credentials");
});

const searchUser = async (key, value) => {
  try {
    const user = await User.findOne({ [key]: value });
    return user === null ? undefined : user;
  } catch (err) {
    throw err;
  }
};

module.exports = router;
