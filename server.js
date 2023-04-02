const express=require('express');

const app=express();

const bodyParser=require('body-parser');

app.use(express.urlencoded({extended: "true"}))



app.use(express.json())

const db=require('./db')

db.connect();

const PORT=process.env.PORT || 8080

const router=require('./router');



// const cors=require("cors");

// var corsOptions={
//     origin :"https://localhost:3000"
    
// }y



// app.use(cors(corsOptions))

app.use(bodyParser.json({limit :"50mb"}))
app.use(bodyParser.urlencoded({extended :true,limit :"50mb"}))

app.use('/question',(req,res)=>{
    res.send("Stackoverflow question")
})
app.use((req,res)=>{
    res.header('Access-Control-Allow-Origin')
    res.header('Access-Control-Allow-header')
})
app.get('/api',(req,res)=>{
    res.json({message :"WELCOME To  STACKOVERFLOW CLONE"})
    console.log("Server is running ");
})

// app.use('/api',router)
// app.use('/upload',express.static(path.join(__dirname,'/../uploads')))
// app.use(express.static(path.join(+__dirname,"/../frontend/build")))
app.get('*',(res,req)=>{
    try{
        res.sendFile(path.json(`${_dirname}/..Frontend/build/index.html`))
    }
    catch(e){
        res.send('Error occured')
    }
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
})