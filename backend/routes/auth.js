const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.json({auth:false, message: "Invalid email or password" });
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.json({auth:false, message: "Invalid email or password" });
      return;
    }
    const id = user._id;
    const token = jwt.sign({id},process.env.JWTSTRING,{
      expiresIn : 900 
    })
    res.status(200).json({auth:true, token : token, result : user, message: "Succesfully logged in"})

  } catch (error) {
    res.status(500).json({auth:false, message: "Internal server error" + error });
  }
});

module.exports = router;
