const express =  require("express");

const router = express.Router()

const authRoute = require("./authRoute")
const serviceRoute = require("./serviceRoute")
const reviewRoute = require("./reviewRoute")

router.use(authRoute)
router.use(serviceRoute)
router.use(reviewRoute)


module.exports = router