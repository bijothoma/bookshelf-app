const router = require("express").Router();
const Friend = require("../models/friend");
const User = require("../models/user");

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
  const allFriends = await Friend.find(userId)
    .populate({ path: "friendId", select: "name" })
    .exec();
  return allFriends;
};

router.get("/getAll/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const friends = await getAllFriends({ userId: userId });
    res.json(friends);
  } catch (error) {
    res.status(500).send({ message: "Internal server error" + error });
  }
});

router.get("/getNotFriends/:userId", async (req, res) => {
  const userId = req.params.userId;
  const friendIds = (
    await Friend.find({ userId: userId }).then((res) => res)
  ).map((friend) => friend.friendId);
  const notFriends = await User.find({ _id: { $nin: [...friendIds, userId] } });
  res.json(notFriends);
});

module.exports = router;
