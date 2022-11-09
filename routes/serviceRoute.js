const express = require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");
const {ObjectId} = require("mongodb");
const formidable = require("formidable");
const upload = require("../services/imgbbUpload");

const router = express.Router()


router.get("/api/services", async function (req, res, next) {
	const {perPage= 10, pageNumber} = req.query
	
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let services = []
		
		let intPageSize = Number(perPage)
		
		// if perPage not provide then fetch all data
		if(perPage && !isNaN(intPageSize)){
			let intPageNumber = Number(pageNumber)
			
			/*
				if page number 1 then return document 0 to limit
				if page number 2 then return document 1 * limit to limit
				if page number 3 then return document 2 * limit to limit
				if page number n then return document (n - 1) * limit to limit
			* */
			
			services = await Service.find({})
				.skip((intPageNumber - 1) * intPageSize)
				.limit(intPageSize)
				.toArray();
			
		} else {
			services = await Service.find({}).limit().toArray();
		}
		res.status(200).send(services)
		
	} catch (ex) {
		next(ex)
	}
})

router.get("/api/services-count", async function (req, res, next) {
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let count = await Service.countDocuments()
		res.status(200).json({total: count})
	} catch (ex) {
		next(ex)
	}
})


router.get("/api/service/:id",  async function (req, res, next) {
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let service = await Service.findOne({_id: ObjectId(req.params.id)})
		res.status(200).send(service ?? null)
		
	} catch (ex) {
		next(ex)
	}
})


// add services with photo upload
router.post("/api/service", auth, function (req, res, next) {
	
	const form = formidable({ multiples: true });
	
	form.parse(req, async (err, fields, files) => {
		if (err) {
			res.status(500).send("Internal error. Form parsing error")
			return;
		}
		
		const {username, title, description, price } = fields
		let oldPath = files["image"].filepath
		
		try {
			let result = await upload(oldPath)
			let uploadedFilePath  = result.image.url;
	
			let db = await mongoConnect()
			const Service = db.collection("services")
		
			let payload = {
				title,
				username,
				email: req.user.email,
				userId: req.user.userId,
				image: uploadedFilePath,
				description,
				price: Number(price),
				createdAt: new Date(),
				updatedAt: new Date()
			}

			let doc = await Service.insertOne(payload)
			if (doc.insertedId) {
				payload._id = doc.insertedId
				res.status(201).send(payload)
			}
		} catch (ex) {
			next(ex)
		}
	});
})


router.patch("/api/service/:serviceId", auth, function (req, res, next) {
	const form = formidable({ multiples: true });
	
	form.parse(req, async (err, fields, files) => {
		if (err) {
			res.status(500).send("Internal error. Form parsing error")
			return;
		}
		
		const { image, title, description, price } = fields
		
		try {
			let uploadedFilePath = image
			
			if(files && files["image"]) {
				let oldPath = files["image"].filepath
				let result = await upload(oldPath)
				uploadedFilePath = result.image.url;
			}
			
			let db = await mongoConnect()
			
			const Service = db.collection("services")
			
			let payload = {}
			if(title){
				payload.title = title
				payload.image = uploadedFilePath
				payload.description = description
				payload.price = Number(price)
				payload.title = title
				payload.email = req.user.email
				payload.updatedAt = new Date()
			}
			
			let doc = await Service.updateOne(
				{_id: ObjectId(req.params.serviceId)},
				{$set: payload}
			)
			
			if (doc) {
				payload._id = req.params.serviceId
				res.status(201).send(payload)
			}
		} catch (ex) {
			next(ex)
		}
	});
})

router.delete("/api/service/:serviceId", auth, async function (req, res) {
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let doc = await Service.deleteOne({_id: ObjectId(req.params.serviceId), userId: req.user.userId})
		if (doc.deletedCount) {
			res.status(201).send({})
		} else {
			res.status(500).send({})
		}
	} catch (ex) {
	
	}
})


module.exports = router
