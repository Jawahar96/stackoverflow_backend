const express = require('express')

const app = express ()

const PORT = process.env.PORT || 8080


const mongoose =require('mongoose')
const mongdb = require('mongodb')
const mongoClient = mongdb.MongoClient
const url = 'mongodb://Jawa:5rcVeox9BthsamPR@ac-cdpanzd-shard-00-00.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-01.l7ed7t0.mongodb.net:27017,ac-cdpanzd-shard-00-02.l7ed7t0.mongodb.net:27017/?ssl=true&replicaSet=atlas-trokem-shard-0&authSource=admin&retryWrites=true&w=majority';
const DB = 'stackoverflow'
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.json({message : "Welcome to Stackoverflow clone"})
})

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
   let question= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(question)
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
   let question= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(question)
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
   let question= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(question)
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
   let question= await db.collection('stack').insertOne(req.body)
   await connection.close()
   res.json(question)
   res.json({message : "Comment answers are updating particular id "})
    }catch(error){
        console.log(error);
        res.status(500).json({message : "Comment is not working"})
    }
})

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON THE PORT ${PORT}`)
})