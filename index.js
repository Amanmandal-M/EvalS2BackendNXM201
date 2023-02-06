const express  = require('express');
const cors = require('cors');
const cookieparser = require('cookie-parser');
require('dotenv').config();

const app = express();

// Routers Location
const { connection } = require('./Configs/db');
const { UserRouter } = require('./Routers/UserRouter');


// Middlewares

app.use(express.json());
app.use(cors());
app.use(cookieparser());

app.use('/users',UserRouter);
app.use()



app.listen(process.env.PORT, async()=>{
    try {
        await connection 
        console.log(`Connected to Database`)
        console.log(`Server is running at ${process.env.PORT}`)
    } catch (error) {
        console.log(`Error in Listening on ${process.env.PORT}`);
    }
})