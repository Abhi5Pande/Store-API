const express = require('express')
require('dotenv').config()
require('express-async-errors')
const app = express()
const notFoundMiddleware=  require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')
const connectDB = require('./db/connect')
const productRouter = require('./routes/products')
//middleware
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send(`<h1>Store Api .<a href='/api/v1/products'> CLick here </a></h1>`)
})
app.use('/api/v1/products',productRouter)


app.use(notFoundMiddleware)
app.use(errorMiddleware)
const port = process.env.PORT || 3000

const start = async() => {
    try {
    //connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port,console.log(`Server is listening on port ${port}...`))       
    } catch (error) {
        console.log(error)
    }
 
}
start()
