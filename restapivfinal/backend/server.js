const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 4000
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/goals',require('./routes/goalRoutes'))
app.use('/api/info',require('./routes/infoRoutes'))
app.use('/api/time',require('./routes/timeRoutes'))
app.use('/api/alltime',require('./routes/alltimeRoutes'))
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/checkIn',require('./routes/checkInRoutes'))
app.use('/api/list',require('./routes/listPORoutes'))
app.use('/api/upload',require('./routes/bolRoutes'))


app.use(errorHandler)

app.listen(port,()=> console.log(`server start on port ${port}`))

