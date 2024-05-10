const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');
const Folder = require('./folderModel');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true
});

User.hasMany(Folder, {
    foreignKey: 'userId'
});

Folder.belongsTo(User, {
    foreignKey: 'userId'
});


module.exports = User;