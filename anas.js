const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Order = require('./models/orders.model.js')
const Payment = require('./models/orders.model.js')

app.use(express.json());

// get all
app.get('/api/orders', async (req,res)=>{
    const data= await Order.find()
    res.send(data)
    console.log(`data:${data}`)
})
//get by id
app.get('/api/orders/:id',async (req,res)=>{
    const {id}=req.params;
    const data= await Order.findById(id)
    res.send(data)
}) 
//update by id 
app.put('/api/orders/:id',async (req,res)=>{
    const {id}=req.params;
    const data= await Order.findByIdAndUpdate(id,req.body)
    console.log(data)
})
//post 
app.post('/api/orders',async (req,res)=>{
    const order = await Order.create(req.body)
    console.log(req.body)
    res.status(200).json(order)
    console.log("item added")
})
//delete
app.delete('/api/orders/:id',async (req,res)=>{
    const {id} =req.params;
    await Order.findByIdAndDelete(id)
    console.log("deleted")
    res.status(200).json({"message":"deleted"})

})





mongoose.connect('mongodb+srv://admin:anasanas@cluster0.vumdt.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Connected!')
    app.listen(3000,(req,res)=>{
        console.log("app running on port 3000")
    })
  })



