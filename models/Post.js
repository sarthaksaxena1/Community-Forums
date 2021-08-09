const mongoose = require('mongoose')

const CommentSchema= new mongoose.Schema(
    {
    
    comment:{type:String,required:true,trim:true},
    comment_by:{type:String,required:true,trim:true},
    commented_on:{type:Date,default:Date.now()}
    
    }
    )
    
const PostSchema = new mongoose.Schema(
{
post_title:{type:String,required:true,trim:true},
post_description:{type:String,required:true,trim:true},
posted_on:{type:Date,default:Date.now()},
post_likes:{type:Number,default:0},
post_comments:[CommentSchema],
post_by:{type:String,required:true,trim:true},
post_image:{type:String,default:"http://placehold.it/750x300",trim:true}

}
)

const UserComment=mongoose.model("Comment",CommentSchema)
const UserPosts = mongoose.model("Post",PostSchema)
module.exports = 
{
    UserPosts:UserPosts,
    UserComment:UserComment
}