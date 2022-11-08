const express = require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");

const router = express.Router()


router.get("/api/services", async function (req, res, next) {
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let services = await Service.find({}).toArray();
		res.status(200).send(services ?? [])
		
	} catch (ex) {
		next(ex)
	}
})


router.post("/api/service", auth, async function (req, res, next) {
	const {name, description, price, image} = req.body
	
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		
		let payload = {
			name,
			email: req.user.email,
			authorId: req.user.uid,
			description,
			price: Number(price)
		}
		
		let doc = await Service.insertOne(payload)
		if (doc.insertedId) {
			payload._id = doc.insertedId
			res.status(201).send(payload)
		}
	} catch (ex) {
		next(ex)
	}
	
})


router.patch("/api/service", function (req, res) {
	res.status(200).send([])
})

router.delete("/api/service", function (req, res) {
	res.status(200).send([])
})


module.exports = router
