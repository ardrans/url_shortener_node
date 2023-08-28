const { Router } = require("express");
const  dashBoardServices = require("../services/dashboard-services") ;

module.exports = () => {
    let api = Router();
    api.post("/url_shortening", dashBoardServices.urlShortening);
    api.get("/list_urls", dashBoardServices.listUrls);
    return api;
};