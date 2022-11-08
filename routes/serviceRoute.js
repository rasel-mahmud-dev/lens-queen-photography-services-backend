const express =  require("express");

const router = express.Router()


router.get("/api/services", function (req, res){
	res.status(200).send([])
})


router.post("/api/service", function (req, res){
	res.status(200).send([])
})


router.patch("/api/service", function (req, res){
	res.status(200).send([])
})

router.delete("/api/service", function (req, res){
	res.status(200).send([])
})


module.exports = router
