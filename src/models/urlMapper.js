const sequelize = require('../clients/mysql_connection');
const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class UrlMapper extends Model {
}

UrlMapper.init({
    url_id: {
        type: Sequelize.INTEGER,
        autoIncrement:true,
        
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {notNull: {msg: "User id is required"}}
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {notNull: {msg: "URL is required"}}
    }
}, {
    timestamps: true,
    paranoid: true,
    underscored: true,
    tableName: "url_mapper",
    sequelize
});

UrlMapper.sync();

module.exports = UrlMapper;

