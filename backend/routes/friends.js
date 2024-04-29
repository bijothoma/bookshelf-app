const router = require("express").Router();
const Friend = require("../models/friend");
const User = require('../models/user');

router.post("/", async (req, res) => {
  try {
    const queryData = req.query;
    const friend = await Friend.findOne(queryData);
    if (friend) {
      return res
        .status(409)
        .send({ message: "This person already exists in your friend list!" });
    }
    await new Friend(queryData).save();
    res.status(201).send({ message: "Friend added successfully." });
  } catch (error) {
    res.status(500).send({ message: "Internal server error" + error });
  }
});

const getAllFriends = async (userId) => {
  const allFriends = await Friend.find(userId);
  return allFriends;
};

router.get("/getAll", async (req, res) => {
  try {
    const friends = getAllFriends(req.body.userId);
    res.json(friends);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
});

router.get("/getNotFriends", async(req, res) => {
    const friendIds = await Friend.find().select('id');
    const notFriends = await User.find({id:{ $nin: friendIds }})
    res.json(notFriends);
})

module.exports = router