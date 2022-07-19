const express = require("express");
const {
  registerDriver,
  toggleAvailability,
} = require("../controllers/driver.controller");

const router = express.Router();
router.post("/driver/register", registerDriver);
router.put("/driver/available", toggleAvailability);

module.exports = router;
