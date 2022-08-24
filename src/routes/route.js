const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishController= require("../controllers/publishController")


router.post("/createBook", bookController.createBook  )
router.post("/createAuthor", authorController.createAuthor  )
 router.post("/createpublisher", publishController.createpublisher )
router.get("/listOfAll", bookController.listOfAll)
router.put("/getdata", bookController.getdata)
//router.put("/updatedPrice", bookController.updatedPrice)
module.exports = router;