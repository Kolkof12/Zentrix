const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const { protect, admin } = require('../middleware/auth');

// @desc Get all courses
router.get('/', async (req, res) => {
    const courses = await Course.find({});
    res.json(courses);
});

// @desc Create course (Admin Only)
router.post('/', protect, admin, async (req, res) => {
    const { title, description, level, lessons } = req.body;
    const course = new Course({ title, description, level, lessons });
    const createdCourse = await course.save();
    res.status(201).json(createdCourse);
});

module.exports = router;
