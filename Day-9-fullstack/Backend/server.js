const app= require('./src/app')


const ConnectToDb=require('./src/config/database')


ConnectToDb()


app.listen(3000,()=>{
    console.log('Server is runing on port 3000')
})