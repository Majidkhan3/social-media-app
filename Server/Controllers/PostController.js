// PostController.js

import PostModel from "../Models/postModel.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";

export const createPost = async (req, res) => {
    const newPost = new PostModel(req.body);
    try {
        await newPost.save();
        res.status(200).json("Post created");
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getPost = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated")


        } else {
            res.status(403).json("Action forbiddem")

        }
    } catch (error) {
        res.status(500).json(error)

    }
}
export const deletePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(Id)
        if (post.userId === userId) {
            await post.deleteOne()
            res.status(200).json("Post Delete successfully")


        } else {
            res.status(403).json("Action forbiddem")

        }
    } catch (error) {
        res.status(500).json(error)

    }
}
export const likePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(Id)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked")


        } else {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post Disliked")

        }
    } catch (error) {
        res.status(500).json(error)

    }
}
// get timeline Post
export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {

        const currentUserPosts = await PostModel.find({ userId: userId })
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            }, {
                $lookup: {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            }, {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
        ])
        res.status(200).json(currentUserPosts.concat(followingPosts))
    } catch (error) {

        res.status(500).json(error)

    }
}