const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Login
router.post('/login', async (req, res) => {
    console.log('Login request recieved');
    const { username, password } = req.body;
    try {
        const targetUser = await searchUser('username', username);
        console.log(targetUser);
        if (targetUser === null || !targetUser) return res.status(404).json({ message: 'User not found' }).send();
        const authorized = targetUser.password === password;
        if (!authorized) return res.status(401).json({ message: 'Invalid password' }).send();
        res.status(200).json({
            username: targetUser.username,
            email: targetUser.email,
            mobile_no: targetUser.mobile_no,
            full_name: targetUser.full_name,
            address: targetUser.address,
            city: targetUser.city
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Register
router.post('/register', async (req, res) => {
    console.log('Register request recieved');
    const { username, email, password } = req.body;
    const user = new User({
        username,
        email,
        password
    });
    try {
        const foundUsername = await searchUser('username', username);
        const foundEmail = await searchUser('email', email);

        if (foundUsername || foundEmail) return res.status(403).json({ message: 'Username or Email is already taken' });

        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
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
