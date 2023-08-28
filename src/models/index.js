const userModel = require('./user');
const urlMapperModel = require('./urlMapper');

userModel.hasMany(urlMapperModel,{
    foreignKey : 'user_id'
});

module.exports = {
    users: userModel,
    urlMapperModel : urlMapperModel
}