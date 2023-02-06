const jwt = require('jsonwebtoken');
const fs = require('fs');
require('dotenv').config();

const Authenticator = async(req,res,next)=>{
    try {
        const normaltoken = req.cookies.NormalToken || ""

        if(!normaltoken){
            return res.status(401).send({"Message": "Login Again"})
        }
        
        // Checking db.json if token is present then send message login again

        const blacklistedToken = JSON.parse(fs.readFileSync('./blacklist.json',"utf-8"))

        if(blacklistedToken.includes(normaltoken)){
            return res.status(401).send("Please Login Again because token is expired")
        }


        jwt.verify(normaltoken , process.env.NORMAL_KEY , (err,decoded)=>{
            if (err) res.status(401).send({"Message":"Please Login First"})
            else{
                const Userrole = decoded?.UserRole
                req.body.role = Userrole
                next();
            }
        })
    } catch (error) {
        console.log(`Error in Middleware: ${error.message}`);
        res.send(`Error in Middleware: ${error.message}`)
    }
}

module.exports = { Authenticator }