const express = require('express');
require('dotenv').config();
const bodyParser =  require("body-parser");
const app = express();
const port = process.env.PORT
app.use(
    bodyParser.json()
);
const urlMapperModel =  require("./models/index").urlMapperModel;
const authenticate = require("./middleware/auth");
const userRoutes = require("./routes/user-routes");
const dashBoardRoutes = require("./routes/dashboard-routes");

app.use("/api/users/", userRoutes());
app.use("/api/dashboard/",authenticate, dashBoardRoutes());
app.use("/:urlId",redirect);

async function redirect(req,res){
    try{
        const urlId = req.params.urlId;
        const url = await urlMapperModel.findByPk(urlId,{attributes:['url']});
        res.redirect(url.url);
    }
    catch (err){
        console.log(err);
    }
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})