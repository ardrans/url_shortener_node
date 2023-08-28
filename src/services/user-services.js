const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');
const userModel = require("../models/index").users;
const redisClient = require("../clients/redis_client");
const sendMail = require("../clients/email_client");


const API = {};

API.signUp = async (req, res) => {
    const params = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    if (params.password)
        params.password = utils.md5(params.password);
    try {
        const user = await userModel.create(params);
        await generateVerificationEmail(user.id, user.email);
        return utils.responseSuccessUtil(res, "Registered successfully, Please check your Email to continue");
    } catch (err) {
        console.log(err.message);
        return utils.responseErrorUtil(res, err.message);
    }

}


API.login = async (req, res) => {
    const userName = req.body.username;
    const password = req.body.password;
    try {
        if (!userName || !password)
            return res.json({
                "success": false,
                "message": ''
            });
        const user = await userModel
            .findOne({
                where: {
                    "email": userName, "password": utils.md5(password),"email_verified":true
                }
            });
        if (!user)
            return utils.responseErrorUtil(res, 'Invalid User or email not verified');
        const token = jwt.sign({"id": user.id}, process.env.JWT_KEY, {
            expiresIn: '1h'
        });
        res.setHeader('token', token);
        return utils.responseSuccessUtil(res, 'User authenticated');
    } catch (err) {
        console.log(err);
        return utils.responseErrorUtil(res, err.message);
    }
}

API.verifyEmail = async (req, res) => {
    const token = req.query.token;
    if(!token)
        return utils.responseErrorUtil(res, 'Token is mandatory');
    try{
        const userId = await redisClient.get(token);
        const user = await userModel.findByPk(userId);
        user.email_verified = true;
        await user.save();
        return utils.responseSuccessUtil(res, 'Email verified, Continue to login screen');
    }catch (err){
        console.log(err);
        return utils.responseErrorUtil(res, err.message);
    }
}

async function generateVerificationEmail(userId, email) {
    try {
        const token = utils.generateRandomString(32);
        await redisClient.set(token, userId, {'EX': 3600});
        const subject = 'Email verification from URL shortener';
        const body = token;
        await sendMail(subject, body, email);
    } catch (err) {
        console.log('Error while generating email verification Token');
        throw new Error('Error while generating email verification Token');
    }
}

module.exports = API;