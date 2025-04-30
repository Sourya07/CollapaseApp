import { Router, Request, Response, response } from 'express';
import jwt from 'jsonwebtoken';
const router = Router();
import { User, Data } from '../../db';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


function isValidUsername(username: string): boolean {
    return /^[a-zA-Z]{3,10}$/.test(username);
}

function isValidPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,20}$/.test(password);
}



router.get('/', (req: Request, res: Response): void => {
    res.json({
        msg: "hlo there"
    })
});

router.post('/signup', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Input validation
    if (!isValidUsername(username) || !isValidPassword(password)) {
        res.status(411).json({ msg: "Error in inputs" });
        return;
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(403).json({ msg: "User already exists with this username" });
            return;
        }

        // Save new user without hashing
        const newUser = new User({ username, password });
        await newUser.save();
        console.log(newUser);

        res.status(200).json({ msg: "Signed up" });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err });
    }
});

router.post('/signin', async (req: Request, res: Response): Promise<void> => {
    const { username, password } = req.body;

    // Input validation
    if (!username || !password) {
        res.status(411).json({ msg: "Please provide both username and password" });
        return;
    }

    try {
        // Find the user by username
        const user = await User.findOne({ username });
        if (!user) {
            res.status(403).json({ msg: "User does not exist" });
            return;
        }

        // Compare the password
        // const isMatch = await (user.password) == password;
        if ((user.password) == password) {
            const token = jwt.sign({
                id: user._id
            }, JWT_SECRET as string)
            console.log(`jwt.sign :1 ${user._id}`)

            res.status(200).json({
                token: token, // Include the token in the response
            });

        }

        // Create JWT token

    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err });
    }
});



export default router;
