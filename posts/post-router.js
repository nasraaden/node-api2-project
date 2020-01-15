const express = require("express");

const router = express.Router();

const Posts = require("../data/db.js");

router.post("/", (req, res) => {
    const postData = req.body;
    if (!postData.title || !postData.contents){
        res.status(200).json( { errorMessage: "Please provide title and contents for the post." })
    } else {
        Posts.insert(postData)
    }
})

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

router.get("/:id", (req, res) => {
    const id = req.param.id;
    Posts.findById(id)
    .then(post => {
        if (post.id !== 0) {
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

router.get("/:id/comments", (req, res) => {
    const id = req.params.id;
    Posts.findPostComments(id)
    .then(comments => {
        if (comments.id !== 0){
            res.status(200).json(comments)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

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