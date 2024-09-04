const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const usersSchema=mongoose.Schema(
{
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
}
)

usersSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  
const Users = mongoose.model("Users",usersSchema);
module.exports = Users
