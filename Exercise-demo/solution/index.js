/** @format */

const mongoose = require("mongoose");
mongoose
    .connect("mongodb://localhost/mongo-exercises")
    .then(() => console.log("mongo connected"))
    .catch((err) => console.error(err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const course = await Course.find({ isPublished: true, tags: "backend" })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 })
        .count();
    console.log(course);
}
async function getCourses2() {
    const course = await Course.find({
            isPublished: true,
            tags: { $in: ["frontend", "backend"] },
        })
        .sort({ price: -1 })
        .select("name author price");
    console.log(course);
}
async function getCourses3() {
    const course = await Course.find({ isPublished: true })
        .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
        .sort("-price")
        .select("name author price");
    console.log(course);
}
getCourses3();