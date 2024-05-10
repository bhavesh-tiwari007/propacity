const User = require('../model/userModel');

async function createUser(username, email, password) {
    try {
        const user = await User.create({
            username,
            email,
            password
        });
        return user;
    } catch (err) {
        return err;
    }
}

async function getAllUsers() {
    try {
        const users = await User.findAll();
        return users;
    }
    catch (err) {
        return err;
    }
}

    async function getUserById(id) {
        try {
            const user = await User.findByPk(id);
            return user;
        }
        catch (err) {
            return err
        }
    }

    async function getUserByEmail(email) {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        }
        catch (err) {
            return err
        }
    }

    module.exports = {
        createUser,
        getUserById,
        getUserByEmail,
        getAllUsers
    }