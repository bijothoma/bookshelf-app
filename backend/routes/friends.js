const router = require("express").Router();
const Friend = require("../models/friend");
const User = require('../models/user');

router.post("/", async (req, res) => {
  try {
    console.log("in friends route");
    const userId = req.body.userId;
    const friendId = req.body.friendId;
    console.log("friend id: ", friendId);
    const friend = await Friend.findOne({
      userId: userId,
      friendId: friendId,
    });
    if (friend) {
      return res
        .status(409)
        .send({ message: "This person already exists in your friend list!" });
    }
    await new Friend(userId, friendId).save();
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
