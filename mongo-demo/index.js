/** @format */

const mongoose = require("mongoose");

mongoose
    .connect("mongodb://localhost/playground")
    .then(() => console.log("connected to MongoDb"))
    .catch((err) => console.error("could not connect", err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
    const course = new Course({
        name: "angular",
        author: "mosh",
        tags: ["angular", "backend"],
        isPublished: true,
    });
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    const courses = await Course.find({ author: "mosh", isPublished: true })
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });
    console.log(courses);
}
getCourses();