const express = require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");
const {ObjectId} = require("mongodb");
const formidable = require("formidable");
const upload = require("../services/imgbbUpload");

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

router.get("/api/service/:id", async function (req, res, next) {
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let service = await Service.findOne({_id: ObjectId(req.params.id)})
		res.status(200).send(service ?? null)
		
	} catch (ex) {
		next(ex)
	}
})


router.post("/api/service", auth, function (req, res, next) {
	
	const form = formidable({ multiples: true });
	
	form.parse(req, async (err, fields, files) => {
		if (err) {
			res.writeHead(err.httpCode || 400, {'Content-Type': 'text/plain'});
			res.end(String(err));
			return;
		}
		
		const {name, description, price, image} = fields
		let oldPath = files["image"].filepath
		
		try {
			let result = await upload(oldPath)
			let filePath  = result.image.url;
	
			let db = await mongoConnect()
			const Service = db.collection("services")

			let payload = {
				name,
				email: req.user.email,
				authorId: req.user.uid,
				image: filePath,
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
	});
})


router.patch("/api/service", function (req, res) {
	res.status(200).send([])
})

router.delete("/api/service", function (req, res) {
	res.status(200).send([])
})


module.exports = router
