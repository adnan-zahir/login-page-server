const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get all users
router.get('/', async (req, res) => {
    console.log('Getting all users');
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Get Credentials
router.get('/:id', async (req, res) => {
    console.log('Getting user credentials');
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (user === null) res.status(404).json({ message: 'User not found' }).send();
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update User
router.put('/:id', async (req, res) => {
    console.log('Updating user credentials');
    const { id } = req.params;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedUser === null) res.status(404).json({ message: 'User not found' }).send();
        console.log(updatedUser);
        res.status(202).json(updatedUser);
    } catch (err) {
        res.status(500).json(err.message);
    }
});

// Delete user
router.delete('/:id', async (req, res) => {
    console.log('Delete request recieved');
    const { id } = req.params;
    try {
        const targetUser = await User.findById(id);
        await targetUser.remove();
        if (!User.findById(id)) throw new Error('Failed to delete user');
        res.status(200).json('Removed user');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
