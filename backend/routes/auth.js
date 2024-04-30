const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.send({ message: "Invalid email or password" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.send({ message: "Invalid email or password" });
      return;
    }
    res.status(200).send({ data: user, message: "Succesfully logged in" });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = router;
