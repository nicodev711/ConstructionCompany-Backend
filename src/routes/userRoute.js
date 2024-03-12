import {Router} from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const router = Router();

router.get('/', (req, res) => {
    res.json({message: "will get all of the users eventually"})
});

router.post('/register', async (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;

    let saltRounds = parseInt(process.env.SALT);
    try {
        let passwordHashed = await bcrypt.hash(password, saltRounds);

        let user = new User({
            username: username,
            email: email,
            password: passwordHashed
        });

        // Save the user or do something else with it
        await user.save()

        // Respond to the client appropriately
        res.status(201).json({message: "User registered successfully", user});
    } catch (error) {
        // Handle errors appropriately
        console.error(error);
        res.status(500).json({message: "An error occurred while registering the user"});
    }
});

router.post('/login', async (req, res) => {
    let email = req.body.email;

    let user = await User.findOne({email: email})

    if (user) {
        let password = req.body.password;
        const match = await bcrypt.compare(password, user.password)
        if (match) {
            user.lastLogging = Date.now();
            req.session.user = {id:user._id, name:user.username, money:user.money}
            console.log(`user logged in: ${user}`)
            res.json({ message: "User logged in.", id: user._id });
        } else {
            console.log(`Incorrect password`)
            res.json({message:"Incorrect password"})
        }
    } else {
        console.log(`User not found`)
        res.json({message:"No user Found"})
    }

})

router.get('/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password'); // Exclude the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user); // Send back the user data
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});



export default router;
