const express = require("express");
const cors = require("cors");
const path = require("path");

require('dotenv').config()

const whitelist = [process.env.FRONTEND]
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json())



app.get("*", (req, res)=>{
	let html = path.resolve("index.html")
	res.sendFile(html)
})


const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>console.log(`Server id running port ${PORT}`))
