const express = require("express");
const router = express.Router();
const viewController = require("../controller/viewController.js");

router.get("/", viewController.getHomePage);
router.get("/home", viewController.getOverviewPage);

module.exports = router;
