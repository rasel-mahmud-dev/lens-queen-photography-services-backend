const express = require("express");
const cors = require("cors");
const path = require("path");
require('dotenv').config()

const routes = require("./routes/index")

const whitelist = [process.env.FRONTEND]
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			
			callback(null, true)
		} else {
			// callback(null, true)new Error('Not allowed by CORS'))
			callback(null, true)
		}
	}
}

const app = express();
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routes)


app.get("*", (req, res)=>{
	let html = path.resolve("index.html")
	res.sendFile(html)
})


// global error handling middleware
app.use((err, req, res, next) => {
	res.status(500).send(err.message || 'Something broke!')
})

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>console.log(`Server id running port ${PORT}`))

