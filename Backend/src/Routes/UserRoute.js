const express = require("express");
const router = express.Router();

const { auth } = require("../Middleware/Authmiddleware");
const { login, signup } = require("../Controller/Authcontroller");

router.post("/login", login);
router.post("/signup", signup);

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    msg: "Hello Test",
  });
});

module.exports = router;
