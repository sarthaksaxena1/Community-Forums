const express= require('express') 
const mongoose = require('mongoose')
const config = require('config')
const DBConnect= require('./config/db')
const {UserPosts} = require('./models/Post')
const app= express()
const {UserComment} = require('./models/Post')
app.use(express.json());
app.use(express.static('public'))

app.set('view engine', 'ejs');

DBConnect()

app.get('/',(req,res)=>{
    UserPosts.find({},(err,docs)=>{
       
       if(!err)
       {
        res.render('index',{data:docs})
        
       }
       else{
        res.json({msg:"Some Error Occured"})
       }
       
      
    })
})

app.get('/create/post',(req,res)=>{
   
    res.render('create')
})

app.get('/create/comment/:id',(req,res)=>{
   const post_id=req.params.id
    res.render('comment',{data:post_id})
})


app.post('/post', async (req,res)=>{
try{


    const PostData= new UserPosts(req.body)
    await PostData.save((err)=>{
        if(!err)
        {
            console.log("Data Saved")
            res.json({msg:"Post Created Sucessfully"})
        }
        else
        {
            console.log("Error OCccured")
            console.log(err)
            res.status(403).json({"msg":"U Trying To Fuk Us"})
        }
    })
}

catch(err)
{
    console.log(err)
    res.sendStatus(403)
}
})



app.post('/create/comment/:id',(req,res)=>{

    UserPosts.find({_id:req.params.id},(err,docs)=>{
        if(!err)
        {

            const CommentData= new UserComment(req.body)
            docs[0].post_comments.push(CommentData)
            docs[0].save((err)=>{
                if(!err)
                {
                    res.json({msg:"Comment Has Been Added"})
                }
                else{
                    console.log(err)
                    res.json({msg:"Some Error Occured"})
                }
            })

        }

        else{
            res.json({msg:"No Post Found With Given Id"})
        }
    })

})

app.get('/comment/:id',(req,res)=>{

    UserPosts.find({_id:req.params.id},(err,docs)=>{
        if(!err)
        {
           

            res.render('show_comment',{data:docs[0].post_comments})

        }

        else{
            res.json({msg:"No Post Found With Given Id"})
        }
    })

})




// app.get('/',(req,res)=>{
//     res.render('index')
// })



app.listen(3000,()=>{
    console.log("Server Has Been Started on 3000")
})