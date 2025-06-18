const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {type:String,required:true}
}, { timestamps: true , versionKey:false});


const user=mongoose.model("user",userSchema)

module.exports={user}