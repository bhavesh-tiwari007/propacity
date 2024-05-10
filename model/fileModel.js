const sequelize = require('../db/db');
const { DataTypes } = require('sequelize');

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    originalname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_last_modified: {
        type: DataTypes.DATE,
        allowNull: false
    },
},{
    timestamps: true
});

module.exports = File;