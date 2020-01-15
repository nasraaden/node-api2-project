const express = require("express");

const router = express.Router();

const Posts = require("../data/db.js");

router.get("/", (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: "The posts information could not be retrieved." 
        })
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
        res.status(500).json({
            error: "The post information could not be retrieved."
        })
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

module.exports = router;