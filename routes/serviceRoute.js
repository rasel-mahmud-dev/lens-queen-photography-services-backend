const express =  require("express");
const mongoConnect = require("../services/mongodb");
const auth = require("../middleware/auth");

const router = express.Router()


router.get("/api/services", async function (req, res, next){
	try {
		let db = await mongoConnect()
		const Service = db.collection("services")
		let services = await Service.find({}).toArray();
		res.status(200).send(services ?? [])

	} catch (ex){
		next(ex)
	}
})


router.post("/api/service", auth, function (req, res){
	const { name, image } = req.body
	
	res.status(200).send([])
})


router.patch("/api/service", function (req, res){
	res.status(200).send([])
})

router.delete("/api/service", function (req, res){
	res.status(200).send([])
})


module.exports = router
