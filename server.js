const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const colore = require('colors')
const connectDb = require('./config/connectDb')
//config dot env file
dotenv.config()

//database call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

//routes
//user router
app.use('/api/v1/users', require('./routes/userRoute'))
//transaction router
app.use('/api/v1/transactions', require('./routes/transactionRoute'))
//port
const PORT = 8000 || process.env.PORT

//listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});