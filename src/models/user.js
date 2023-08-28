const sequelize = require('../clients/mysql_connection');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class Users extends Model {
}

Users.init({
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notNull: {msg: "Name is required"}}
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: {
            name: 'email',
            msg: 'Email address already registered with US.',
        },
        validate: {notNull: {msg: "Email is required"}}
    }, password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false,
        validate: {notNull: {msg: "password is required"}}
    },
    email_verified:{
        type: Sequelize.BOOLEAN,
        default : false
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "registered_users",
    sequelize
});

Users.sync();

module.exports = Users;

