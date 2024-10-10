import express from 'express';
import jwt from 'jsonwebtoken';
// const express = require("express");
// const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json());
const ALL_USERS = [
    {
        username: "souraj@gmail.com",
        password: "123",
        name: "souraj ghosh",
    },
    {
        username: "raman@gmail.com",
        password: "123321",
        name: "Raman singh",
    },
    {
        username: "priya@gmail.com",
        password: "123321",
        name: "Priya kumari",
    },
];

function userExists(username, password) {
    // write logic to return true or false if this user exists
    // in ALL_USERS array
    return ALL_USERS.some(user => user.username === username && user.password === password);
}

app.post("/signin", function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    if (!userExists(username, password)) {
        return res.status(403).json({
            msg: "User doesnt exist in our in memory db",
        });
    }

    var token = jwt.sign({username: username}, jwtPassword);
    return res.json({
        token,
    });
});

app.get("/users", function (req, res) {
    const token = req.headers.authorization;
    try {
        const decoded = jwt.verify(token, jwtPassword);
        const username = decoded.username;
        // return a list of users other than this username
        const otherUsers = ALL_USERS.filter(user => user.username !== username);
        console.log(otherUsers)
        return res.json({
            users: otherUsers
        });
    } catch (err) {

        return res.status(401).json({
            // msg: "Invalid token",
            msg: err
        });
    }
});

app.listen(3001, () => {
    console.log("listening on port 3001")
})