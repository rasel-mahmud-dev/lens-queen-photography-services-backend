const express =  require("express");
const {createToken, parseToken} = require("../services/jwt");

const router = express.Router()


router.get("/api/auth/validate-token", async function (req, res, next){
	try {
		let token = req.headers["token"]
		if(!token){
			return res.status(500).send("token not found")
		}
		
		let data = await parseToken(token)
		
		res.status(201).json({
			token
		})
	} catch (ex){
		next(ex)
	}
})


router.post("/api/auth/generate-token", function (req, res){
	const { uid, email } = req.body
	let token = createToken(uid, email)
	res.status(201).json({
		token
	})
})



module.exports = router
