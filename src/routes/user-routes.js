const { Router } = require("express");
const  userServices = require("../services/user-services") ;

module.exports = () => {
    let api = Router();
    api.post("/login", userServices.login);
    api.post("/signup", userServices.signUp);
    api.get("/verify",userServices.verifyEmail);
    return api;
};