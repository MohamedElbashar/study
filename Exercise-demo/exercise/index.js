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
    price: Int32Array,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
    const course = await Course.find({ isPublished: true })
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
}

async function getCourses2() {
    const course = await Course.find({ isPublished: true, price: { $gte: 15 } })
        .or({ name: /.*by.*/i })
        .sort("-price")
        .select("name author price");
}
getCourses2();