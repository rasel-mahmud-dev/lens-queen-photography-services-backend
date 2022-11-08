const express =  require("express");
const {createToken} = require("../services/jwt");

const router = express.Router()


router.post("/api/auth/generate-token", function (req, res){
	const { uid, email } = req.body
	let token = createToken(uid, email)
	res.status(201).json({
		token
	})
})



module.exports = router
