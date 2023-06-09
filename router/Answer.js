const express=require('express');

const router=express.Router();

const Answerdb=require('../models/Answer');

router.post('/',async(req,res)=>{
    const answerData=new  Answerdb({
        question_id:req.body.question_id,
        answer:req.body.answer,
        user:req.body.user
    })
    await answerData.save().then((doc)=>{
        res.status(201).json({
            status:true,
            data:doc
        })
    }).catch((err=>{
       
        res.status(400).json({
            status:false,
            message :"Error while adding answer"
        })
    })
    
    
    )}

) 
module.exports=router