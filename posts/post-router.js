const express = require("express");

const router = express.Router();

const Posts = require("../data/db.js");

// POST for a post in /api/posts
router.post("/", (req, res) => {
    const postData = req.body;
    if (!postData.title || !postData.contents){
        res.status(200).json( { errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(postData)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
    }
})

// POST for post in /api/posts/:id/comments
router.post("/:id/comments", (req, res) => {
    const id = req.params.id;
    const comment = req.body;
    if (!comment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        Posts.insertComment(comment)
        .then(comment => {
            if (comment){
                res.status(201).json(comment)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "There was an error while saving the comment to the database." })
        })
    }
})

// GET for all posts in /api/posts
router.get("/", (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})

// GET for posts by id in /api/posts/:id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    Posts.findById(id)
    .then(post => {
        if (post.length !== 0) {
            res.status(200).json(post)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

// GET for all post comments by id in /api/posts/:id/comments
router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
    Posts.findPostComments(id)
    .then(comments => {
        if (comments.length !== 0){
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist or have comments." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

// DELETE for a post by id in /api/posts/:id
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
    .then(deleted => {
        if (deleted) {
            res.status(200).json(deleted)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The post could not be removed." })
    })
})

// PUT for a post by id in /api/posts/:id
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const postData = req.body;
    if (!postData.title || !postData.contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.update(id, postData)
        .then(updated => {
            if (updated){
                res.status(200).json(updated)
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ error: "The post information could not be modified." })
        })
    }
})

module.exports = router;