const app= require('./src/app')
require('dotenv').config()

const ConnectToDb= require('./src/config/database')

ConnectToDb()


app.listen(3000,()=>{
    console.log('Server is running on Port 3000')
})