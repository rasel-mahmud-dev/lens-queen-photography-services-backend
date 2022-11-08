const express =  require("express");

const router = express.Router()

const authRoute = require("./authRoute")
const serviceRoute = require("./serviceRoute")

router.use(authRoute)
router.use(serviceRoute)


module.exports = router