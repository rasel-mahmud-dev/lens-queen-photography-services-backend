const express =  require("express");

const router = express.Router()

const authRoute = require("./authRoute")
const serviceRoute = require("./serviceRoute")
const reviewRoute = require("./reviewRoute")
const mongoConnect = require("../services/mongodb");


router.use(authRoute)
router.use(serviceRoute)
router.use(reviewRoute)


router.get("/api/blogs", async (req, res, next)=>{
	try {
		let db = await mongoConnect()
		const Blog = db.collection("blogs")
		let blogs = await Blog.find({}).toArray();
		res.status(200).send(blogs)
	} catch (ex) {
		next(ex)
	}
})

router.get("/api/testimonials", async (req, res, next)=>{
	try {
		let db = await mongoConnect()
		const Testimonial = db.collection("testimonials")
		let testimonials = await Testimonial.find({}).toArray();
		res.status(200).send(testimonials)
	} catch (ex) {
		next(ex)
	}
})

router.get("/api/projects", async (req, res, next)=>{
	try {
		let db = await mongoConnect()
		const Project = db.collection("projects")
		let projects = await Project.find({}).toArray();
		res.status(200).send(projects)
	} catch (ex) {
		next(ex)
	}
})

module.exports = router