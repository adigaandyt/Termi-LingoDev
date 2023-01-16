require('dotenv').config()
const PORT=process.env.PORT || 5000
const express= require("express")
const app =express()
const {errorHandler}=require('./middleware/errorMiddleware')
const connectDB=require('./config/db')
const colors=require('colors');

app.use(express.json())
app.use(express.urlencoded({extended: true}))




connectDB()

//Routes
app.use('/api/users', require('./Routes/userRoutes'))
app.use('/api/concepts',require('./Routes/conceptRoutes'))
app.use('/api/categories',require('./Routes/categoryRoutes'))
app.use('/api/games',require('./Routes/gamesRoutes'))
// app.use('/api/loging',require('./Routes/logingRoutes'))

// app.use('/api/loging',require('./Routes/logingRoutes'))

// use the errorHandler function for manage error events 
app.use(errorHandler)

app.listen(PORT,function(){
    console.log(`started serve on port ${PORT}`)
})