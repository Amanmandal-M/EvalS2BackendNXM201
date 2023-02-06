const express = require('express');


// Model Location && Routers Location
const { authorize } = require('../Middlewares/Authorize');


// Impoting Modules
require('dotenv').config();


const RoleRouter = express.Router();


RoleRouter.get("/goldrate", (req, res) => {
    res.send("Gold Rate is Here")
})
  

RoleRouter.get("/userstats",authorize(['manager']),(req, res) => {
    res.send("UserStats is Here")
})


module.exports = {RoleRouter}