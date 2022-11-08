const {parseToken} = require("../services/jwt");

async function auth (req, res, next){
	try {
		let token = req.headers["token"]
		if(!token){
			return res.status(500).send("token not found")
		}
		
		let data = await parseToken(token)
		req.user = data
		next()
		
	} catch (ex){
		next(ex)
	}
}

module.exports = auth