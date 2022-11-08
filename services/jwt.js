const jwt = require('jsonwebtoken')

exports.createToken = (uid, email, expiresIn)=> {
	return jwt.sign({
			uid: uid,
			email: email
		},
		process.env.JWT_SECRET, {expiresIn: expiresIn ? expiresIn : '1'}
	)
}


exports.parseToken = (token)=> {
	return new Promise(async (resolve, reject)=>{
		try {
			if(token) {
				let d = await jwt.verify(token, process.env.JWT_SECRET)
				resolve(d)
			} else {
				reject(new Error("Token not found"))
			}
		} catch (ex){
			reject(ex)
		}
	})
}

exports.getToken = (req)=> {
	return req.headers["authorization"]
}


