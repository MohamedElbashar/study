/** @format */

const express = require("express");
const router = express.Router();

const courses = [
    { id: "1", name: "node" },
    { id: "2", name: "react" },
    { id: "3", name: "python" },
];

router.get("/", (req, res) => {
    res.send(courses);
});

router.get("/:id", (req, res) => {
    const course = courses.find((c) => c.id === req.params.id);
    !course ? res.status(404).send("this course not exist") : res.send(course);
});

router.post("/", (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});

router.put("/:id", (req, res) => {
    const course = courses.find((c) => c.id === req.params.id);
    if (!course) return res.status(404).send("this course not exist");

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    course.name = req.body.name;
    res.send(course);
});

router.delete("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === req.params.id);
    if (!course) return res.status(404).send("this course not exist");

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    res.send(course);
});

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(2).required(),
    };
    return Joi.validate(course, schema);
};
module.exports = router;