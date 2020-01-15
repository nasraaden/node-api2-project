const express = require("express");

const router = express.Router();

const Posts = require("../data/db.js");

router.get("/", (req, res) => {
    Posts.find()
})