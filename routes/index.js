const express =  require("express");

const router = express.Router()

const authRoute = require("./authRoute")

router.use(authRoute)


module.exports = router