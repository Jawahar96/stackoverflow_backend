const express=require('express');

const mongoose=require('mongoose');

const router=express.Router();
const QuestionDb=require('../models/Question');
router.post('/',async(req,res)=>{
    const questiondata=new QuestionDb({
        title:req.body.title,
        body :req.body.body,
        tags :req.body.tags,
        user :req.body.user    
    
    })
 await questiondata.save().then((doc)=>{
    res.status(201).send(doc)
    data:doc

 }).catch((err)=>{
    res.send(400).send({
        status :"false",
        message :"Error occur in adding the question"
    })

 })

})

module.exports=router;