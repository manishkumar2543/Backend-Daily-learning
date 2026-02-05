const app=require('./src/app');
const mongoose=require('mongoose');

function ConnectToDb(){
    mongoose.connect('mongodb+srv://monu:BdjKeEFjYK612Q1P@cluster0.yn6aof6.mongodb.net/Day7-ConnectDb')
    .then(()=>{
        console.log("Connected to Db");
    })
}
ConnectToDb();


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})