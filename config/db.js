const mongoose = require('mongoose')
const config = require('config')


const DBConnect = async() =>
{
    try {
   await mongoose.connect(config.get('MONGO_URI'),{ useNewUrlParser: true , useUnifiedTopology: true},(err)=>{
    if(!err)
    {
        console.log("DB Connected SucessFully")
    }
    else
    {
        console.log(err)
    }
    })
}

catch(err)
{
    console.log(err)
}

}

module.exports=DBConnect