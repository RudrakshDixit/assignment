const express = require("express");
const {
  registerUser,
  startTrip,
  endTrip,
} = require("../controllers/user.controller");

const router = express.Router();

router.post("/user/register", registerUser);
router.put("/user/start-trip", startTrip);
router.put("/user/end-trip", endTrip);
module.exports = router;
