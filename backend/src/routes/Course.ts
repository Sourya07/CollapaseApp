import { Router, Request, Response, response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();
import { Data } from '../../db';
import { userMiddleware, AuthenticatedRequest } from '../../middleware/User'

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


router.get("/courses", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const courses = await Data.find({});
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put("/courses", userMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { type, link, title, tags } = req.body;

    // Validate required fields
    if (!type || !link || !title) {
        res.status(400).json({ error: "type, link, and title are required." });
        return
    }

    // Validate type
    const validTypes = ['document', 'tweet', 'youtube', 'link'];
    if (!validTypes.includes(type)) {
        res.status(400).json({ error: "Invalid type. Must be one of: document, tweet, youtube, link" });
        return
    }

    try {
        const newCourse = new Data({
            type,
            link,
            title,
            tags: tags || [],
            user: req.userId
        });

        await newCourse.save();
        res.status(201).json({ message: "Course created successfully", course: newCourse });
    } catch (err) {
        res.status(500).json({ error: "Failed to create course" });
    }
});


router.get("/courses/mine", userMiddleware, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    try {
        const adminCourses = await Data.find({
            user: req.userId
        });

        res.status(200).json({ adminCourses });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch user's courses" });
    }
});

router.get("/courses/:id", async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const courseId = req.params.id;

    try {
        const course = await Data.findById(courseId).populate('user');

        if (!course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }

        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch course" });
    }
});



export default router;