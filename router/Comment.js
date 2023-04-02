const express=require('express')
const router=express.Router()
const CommentDb=require('../models/Comment')
router.post('/',async (req,res)=>{
    try{
        await CommentDb.create({
            question_id:req.params.id,
            comment :req.body.comment,
            user:req.body.user
        }).then((doc)=>{
            res.status(201).send({
                status:true,
                mesage:"comment added succesfully"
            })
        }).catch(()=>{
            res.status(400).send({
                status:false,
                message:"Error while adding comment"
            })
        })
    }catch(err){
        res.status(500).send({
            status:false,
            message:"Error while adding comment"
        })

    } 
})
module.exports=router;