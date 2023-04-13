const express=require('express');

const app=express();
const { connection } = require('mongoose');
const bodyParser=require('body-parser');
const path =require('path')

app.use(express.urlencoded({extended: "true"}))


const Db =process.env.PORT

app.use(express.json())

const db=require('./db')

db.connect();

const PORT=process.env.PORT || 8080
const router=require('./router');



const cors=require("cors");


var corsOptions={
    origin :"https://localhost:3000"
    
}



app.use(cors(corsOptions))

app.use(bodyParser.json({limit :"50mb"}))
app.use(bodyParser.urlencoded({extended :true,limit :"50mb"}))

app.use('/questions',(req,res)=>{
    const db =connection.db(Db)
    res.send("Stackoverflow question")
    res.status(201).json({message : "Stackoverflow questions is connecting"})

})
// app.use((req,res)=>{
//     res.header('Access-Control-Allow-Origin')
//     res.header('Access-Control-Allow-header')
app.get('/api',(req,res)=>{
    res.json({message :"WELCOME To  STACKOVERFLOW CLONE"})
    
})

app.use('/api',router)
// app.use('/upload',express.static(path.join(__dirname,'/../uploads')))
// app.use(express.static(path.join(+__dirname,"/../frontend/build")))
app.get('*',(res,req)=>{
    try{
        res.sendFile(path.json(`${_dirname}/..Frontend/build/index.html`))
    }
    catch(error){
        console.log(error);
        // res.send('Error occured')
        res.status(500).json({message : "Error occured in the system"})
    }
})


app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`);
})