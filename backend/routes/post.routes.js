const express = require("express");
const { PostModel } = require("../model/post.model");
const { auth } = require("../middleware/auth.middleware");

const postRouter = express.Router();

postRouter.use(auth);

//POST
postRouter.post("/add", async (req, res) => {
  try {
    const post = new PostModel(req.body);
    await post.save();
    res.status(200).send({ message: "Post created", post: post });
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//GET
postRouter.get("/", async (req, res) => {
  try {
    const post = await PostModel.find({ name: req.body.name });
    res.status(200).send(post);
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});


//TOP Comments
postRouter.get("/top", async (req, res) => {
    try {
      const post = await PostModel.find({ name: req.body.name }).sort({no_of_comments: -1});
      res.status(200).send(post);
    } catch (err) {
      res.status(400).send({ err: err.message });
    }
  });

//UPDATE
postRouter.patch("/update/:postID", async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (req.body.userID == post.userID) {
      await PostModel.findByIdAndUpdate({ _id: postID }, req.body);
      res.status(200).send({ message: `Post with ID:${postID} updated` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

//DELETE
postRouter.delete("/delete/:postID", async (req, res) => {
  const { postID } = req.params;
  const post = await PostModel.findOne({ _id: postID });
  try {
    if (req.body.userID == post.userID) {
      await PostModel.findByIdAndDelete({ _id: postID }, req.body);
      res.status(200).send({ message: `Post with ID:${postID} deleted` });
    }
  } catch (err) {
    res.status(400).send({ err: err.message });
  }
});

module.exports = { postRouter };
