const { createUser, getUserById, getUserByEmail, getAllUsers } = require("../services/userServices")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function createUserController(req, res) {
    try {
        const { username, email, password } = req.body;
        const checkUser = await getUserByEmail(email);
        if (checkUser) return res.status(400).json({ message: "User already exists" });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(username, email, hashedPassword);
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(404).json({ message: "User not found" });
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: "Invalid password" });
        const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET);
        res.status(200).json({ message: "Login successful", data: user, token: token });
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers();
        if (!users) return res.status(404).json({ message: "Users not found" });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
}


async function getUserByIdController(req, res) {
    try {
        const { id } = req.params;
        const user = await getUserById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

async function getUserByEmailController(req, res) {
    try {
        const { email } = req.params;
        const user = await getUserByEmail(email);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createUserController,
    getUserByIdController,
    getUserByEmailController,
    getAllUsersController,
    userLoginController
}