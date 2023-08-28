const utils = require('../utils/utils');
const urlMapperModel =  require("../models/index").urlMapperModel;
const API = {};

API.urlShortening = async (req,res) =>{
    const url = req.body.url;
    try {
        const urlMapper = await urlMapperModel.create({
            "url": url,
            "user_id":req.user.id
        });
        const shortUrl = `${process.env.HOST}:${process.env.PORT}/${urlMapper.url_id}`;
        return utils.responseSuccessUtil(res,'Url shortened',shortUrl);
    }catch (err){
        console.log(err);
        return utils.responseErrorUtil(res,err.message);
    }
}


API.listUrls = async (req,res) =>{
    const userId = req.user.id;
    try {
        const urls = await urlMapperModel.findAll({where: {
                "user_id": userId
        },attributes:['url','url_id']});
        const response = urls.map((url)=>{
            return {
                "shortUrl" : `${process.env.HOST}:${process.env.PORT}/${url.url_id}`,
                "url" : url.url
            }
        })
        return utils.responseSuccessUtil(res,'Url shortened',response);
    }catch (err){
        console.log(err);
        return utils.responseErrorUtil(res,err.message);
    }
}


module.exports = API;