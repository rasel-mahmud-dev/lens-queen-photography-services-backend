const express = require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");
const {ObjectId} = require("mongodb");

const router = express.Router()


router.get("/api/reviews/:serviceId", async function (req, res, next) {
	try {
		const db = await mongoConnect()
		const Review = db.collection("reviews")
		let reviews = await Review.find({serviceId: ObjectId(req.params.serviceId)}).toArray();
		res.status(200).send(reviews)
	} catch (ex) {
		next(ex)
	}
})


// add review
router.post("/api/review", auth, async function (req, res, next) {
	
	const {
		name,
		serviceId,
		title,
		userPhoto,
		description,
		rate
	} = req.body
	
	try {
		
		let db = await mongoConnect()
		const Review = db.collection("reviews")
		
		let payload = {
			name,
			rate: Number(rate),
			serviceId,
			title,
			image: userPhoto,
			description: description,
		}
		
		let doc = await Review.insertOne(payload)
		if (doc.insertedId) {
			payload._id = doc.insertedId
			res.status(201).send(payload)
		}
	} catch (ex) {
		next(ex)
	}
	
})



router.delete("/api/review/:reviewId", async function (req, res) {
	try {
		let db = await mongoConnect()
		const Review = db.collection("reviews")
		let doc = await Review.deleteOne({_id: ObjectId(req.params.reviewId)})
		if (doc.deletedCount) {
			res.status(200).send({})
		} else {
			res.status(500).send({})
		}
	} catch (ex) {
	
	}
})


module.exports = router

