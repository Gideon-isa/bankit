const express = require('express')
const dotenv = require('dotenv')
const {swaggerDocs, swaggerUi} = require('../swagger.js')
dotenv.config();
// const userRouter = require('./routes/User.Routes.js')
const usertranserRouter = require('./routes/transfer.Routes.js')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(cors())


app.get('/', (req, res)=>{
    res.send("Welcome to Bankit")
})

app.use('/api-docs', swaggerUi.serve, 
    swaggerUi.setup(swaggerDocs, {explorer: true})
);

app.use('/api/user/transfer', usertranserRouter)

const port = process.env.PORT || 8080
console.log(port);
app.listen(3001, ()=>{
    console.log("Server is running at 3001")

})
