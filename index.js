const express = require('express')

const app = express ()

const PORT = process.env.PORT || 8080
const mongoose =require('mongoose')
const mongdb = require('mongodb')
const mongoClient = mongdb.MongoClient
const cors = require('cors')
const dotenv = require('dotenv').config()
const url = process.env.DB
// const url = 'mongodb://Jawa:5rcVeox9BthsamPR@ac-cdpanzd-shard-00-00.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-01.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-02.l7ed7t0.mongodb.net:27017/?ssl=true&replicaSet=atlas-trokem-shard-0&authSource=admin&retryWrites=true&w=majority';
const DB = 'Stackoverflow'

const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

// middleware
app.use(express.json())
app.use(cors({
    origin : "http://localhost:3000"
}))


app.get('/',function(req,res){
    res.json({message : "Welcome to Stackoverflow clone"})
})

let authenticate =(req,res,next)=>{
    if(req.header.authorization){
        try{
            const valid  = jwt.verify(req.header.authorization,process.env.SECRET)
            console.log(valid);
            if(valid){
                next()
            }
        }catch(error){
            res.status(401).json({message : "Unauthorized"})
        }

    }else{
        res.json(401).json({message : "Unauthorized"})
    }
}

// create question
app.post('/createquestion',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
    await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json({message : "Question is asking "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Question are not raised properly"})
    }
})
// get the question
app.get('/getquestion',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let question= await db.collection('stack').find().toArray()
   await connection.close()
   res.json(question)
   res.json({message : "Get the user question "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Users  are  not able to list the question"})
    }
})

app.post('/createanswer',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let question= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(question)
   res.json({message : "Answer is correct "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Answer is not correct for particular question"})
    }
})
app.get('/getanswer',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let answer= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(answer)
   res.json({message : "List the answer for questions "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Something went wrong"})
    }
})
// Update the particular user id answer
app.put('/answer/:id',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let answer= await db.collection('stack').findOneAndUpdate({_id: new mongdb.ObjectId(req.params.id)},{$set : req.body})
   await connection.close()
   res.json(answer)
   res.json({message : "Update the answer "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Answer is not updating"})
    }
})
app.post('createcomment',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let comment= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(comment)
   res.json({message : "Comment your answer "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Comment is not working"})
    }
})
app.put('/comment/:id',async function(req,res){
    try{
    const connection = await mongoClient.connect(url)
    const db = connection.db(DB)
   let comment= await db.collection('stack').findOneAndUpdate({_id: new mongdb.ObjectId(req.params.id)},{$set : req.body})
   await connection.close()
   res.json(comment)
   res.json({message : "Comment answers are updating particular id "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Comment is not working"})
    }
})

app.post('/register', async function(req,res){
    try{

        const connection = await mongoClient.connect(url)
        const db= connection.db(DB)
       let salt= await bcrypt.genSalt()          
       console.log(salt);
       let hash = bcrypt.hash(req.body.password,salt)
       console.log(hash);
    req.body.password = hash
 await  db.collection('stack').insertOne(req.body)
          await connection.close()
           res.json({message : "User registered the details successfully"})
    }catch(error){
        console.log(error);
        res.json( error)

    }
})

app.post('/login',async function(req,res){
    try{
    let connection= await mongoClient.connect(url)
    let db = connection.db(DB)
    let users= await db.collection('userreg').findOne({email :req.body.email})
  if(users){
   let compare = await bcrypt.compare(req.body.password,users.password)
   if(compare){
   const  token = jwt.sign({_id : users._id},process.env.SECRET,{expiresIn : "15m"});

   res.json({token})
   
}else{
    res.json({message : "Login credential failed"})
}
  }
  else{
   
    res.status(401).json({message : "Username/password is wrong "})
  }

    }catch(error){
        console.log(error);
    }
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`)
})