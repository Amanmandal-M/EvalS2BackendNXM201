const express  = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Routers Location
const { connection } = require('./Configs/db');
const { UserRouter } = require('./Routers/UserRouter');
const { LogoutRouter } = require('./Routers/LogoutRouter');
const { Authenticator } = require('./Middlewares/Authenticate');
const { RoleRouter } = require('./Routers/RoleRouter');


// Middlewares

app.use(express.json());
app.use(cors());
app.use(cookieparser());


app.get('/', (req,res)=>{res.send("Evaluation Deployed Link")})
app.use(UserRouter);
app.use(Authenticator)
app.use(LogoutRouter)
app.use(RoleRouter)


app.listen(process.env.PORT, async()=>{
    try {
        await connection 
        console.log(`Connected to Database`)
        console.log(`Server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(`Error in Listening on ${process.env.PORT}`);
    }
})