const express=require('express');

const router=express.Router()
const questionRouter=require('./Question')

const answerRouter=require('./Answer')
const commentRouter=require('./Comment')

router.get('/home',(req,res)=>{
    res.send('Welcome to stackoverflow clone')
    res.json({message : "Connecting to  all database "})
});

router.use('/question',questionRouter);
router.use('/answer',answerRouter);
router.use('/comment',commentRouter);


module.exports=router;