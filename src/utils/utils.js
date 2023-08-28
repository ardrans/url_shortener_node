const crypto = require('crypto');
const utils = {};

utils.md5 = (data) =>{
    const md5Hash = crypto.createHash('md5');
    md5Hash.update(data);
    return  md5Hash.digest('hex');
}

utils.generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

utils.responseSuccessUtil = async (res,message,data = null) =>{
    return res.json({
        "success":true,
        "message" : message,
        "data" : data
    });
}

utils.responseErrorUtil = async (res,message) =>{
    return res.json({
        "success":false,
        "message" : message
    });
}

module.exports = utils;