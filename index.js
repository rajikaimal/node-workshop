const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 3000;
const mongoConnection = process.env.MONGO_CONNECTION;

mongoose.connect(mongoConnection, {useNewUrlParser: true});

let post = mongoose.model('Post', {
    name: String,
    content: String
});

app.get("/", (req, res) => {
    res
        .json({status: true, data: []})
        .status(200);
});

app.post("/post/add", (req, res) => {
    const newPost = new post({name: "Avengers", content: "Awesome movie ..."});

    newPost
        .save()
        .then((results, err) => {
            console.log("Here");
        });
});

app.get("/post/all", (req, res) => {
    post
        .find({})
        .then((post, err) => {
            console.log(err);

            res.json(post)
        });
});

app.put("/post/update", (req, res) => {});

app.delete("/post/:id", (req, res) => {
    const postId = req.params.id;

    post
        .deleteOne({name: "Avengers"})
        .then((result, err) => {
            console.log(result);

            res.json({status: true})
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});