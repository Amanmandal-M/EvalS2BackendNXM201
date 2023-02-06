const express = require('express');
const fs = require('fs');

const LogoutRouter = express.Router();

LogoutRouter.get('/logout', (req, res)=>{
    const Normaltoken = req.cookies.NormalToken || ""

    const blacklisteddata = JSON.parse(fs.readFileSync("./blacklist.json","utf-8"))

    blacklisteddata.push(Normaltoken);

    fs.writeFileSync("./blacklist.json",JSON.stringify(blacklisteddata))

    res.status(200).send("Log Out Successfully");
})


module.exports = {LogoutRouter}
