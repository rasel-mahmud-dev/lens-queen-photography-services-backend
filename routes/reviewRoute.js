const express = require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");
const {ObjectId} = require("mongodb");

const router = express.Router()


// get single  review for id
router.get("/api/review/:reviewId", auth, async function (req, res, next) {
	
	try {
		let db = await mongoConnect()
		const Review = db.collection("reviews")
		let review = await Review.findOne({_id: ObjectId(req.params.reviewId)})
		res.status(200).send(review)
	} catch (ex) {
		next(ex)
	}
})


// get all reviews by serviceId or userId
// serviceId provide using params
router.get("/api/reviews", async function (req, res, next) {
	const {userId, serviceId}  = req.query
	try {
		const db = await mongoConnect()
		const Review = db.collection("reviews")
		let reviews = []
		
		if(userId){
			// join service for each review
			reviews = await Review.aggregate([
				{ $match: { userId: userId } },
				{
					$lookup: {
						from: "services",
						localField: "serviceId",
						foreignField: "_id",
						as: "service"
					}
				},
				{ $unwind: { path: "$service", preserveNullAndEmptyArrays: true } }
			]).toArray();
			
		} else if(serviceId){
			reviews = await Review.find( { serviceId: ObjectId(serviceId)}).toArray()
		}
		
		res.status(200).send(reviews)
	} catch (ex) {
		next(ex)
	}
})


// add review
router.post("/api/review/:serviceId", auth, async function (req, res, next) {
	const {
		name,
		title,
		userPhoto,
		description,
		rate
	} = req.body
	
	try {
		
		let db = await mongoConnect()
		const Review = db.collection("reviews")
		
		let payload = {
			userId: req.user.userId,
			name,
			rate: Number(rate),
			serviceId: new ObjectId(req.params.serviceId),
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


// delete service id
router.delete("/api/review/:reviewId", auth, async function (req, res) {
	try {
		let db = await mongoConnect()
		const Review = db.collection("reviews")
		let doc = await Review.deleteOne({_id: ObjectId(req.params.reviewId), userId: req.user.userId})
		if (doc.deletedCount) {
			res.status(200).send({})
		} else {
			res.status(500).send({})
		}
	} catch (ex) {
	
	}
})


module.exports = router

