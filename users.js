const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Users = require('./models/users.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.use(express.json());

const secretKey = 'super_secrethard_impo_keyGamehfeuakuv'; // Replace with your actual secret key




app.post('/signup', async (req,res)=>{
    try {
       var newuser= await Users.create(req.body)
       res.send(newuser)
       console.log('user added')

    } catch (error) {
        console.log("cant add user to database")
    }
})



app.post('/login', async (req,res)=>{
    try {
    var {username,password}=await req.body
    var user = await Users.findOne({username})
    if(user){
        issame=await bcrypt.compare(password,user.password)
        if(issame){
            const payload = {
                username:username,
                password:password
            };
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            res.send(token)
        }
        else{
        res.send({"message":"wrong pass"})} 
    }
    else{res.send({"message":"this username doesnt exist"})}

} catch (error) {
        res.send(error.message)
}

})



app.post('/protected',async(req,res)=>{
// authheader have the value of key
    const authHeader = await req.headers.authorization;
    //const token =await authHeader && authHeader.split(' ')[1];
    console.log(authHeader)
    
    if (authHeader == null) {
     res.sendStatus(401);
    } // Unauthorized
    try {
        jwt.verify(authHeader, secretKey)
        res.send({"message":"authed"})
    } catch (error) {
        res.send({"m":"no access"})
    }
})


mongoose.connect('mongodb+srv://admin:anasanas@cluster0.vumdt.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Connected!')
    app.listen(3000,(req,res)=>{
        console.log("app running on port 3000")
    })
  })

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuYXNlbHNheWVkIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkiLCJpYXQiOjE3MjU0NTk0NDIsImV4cCI6MTcyNTQ2MzA0Mn0.FXBF1qQyTwhIjvilHMDVuiso1hnSY-eG-WTLy1vZkYY
