const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Order = require('./models/orders.model.js')
const Payment = require('./models/orders.model.js')



app.use(express.json());


//get all
app.get('/api/orders',async(req,res)=>{
    try {
        const order = await Order.find()
        res.status(200).json(order)
        console.log("restoring items")
    } catch (error) {
        console.log("cant get from database")
    }
})

//get by id
app.get('/api/orders/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        console.log(req.params)

        const order = await Order.find({id})
        console.log(order)
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

//update
app.patch('/api/orders/:id',async(req,res)=>{
    const {id} = req.params;
    const {change}=req.body
    update_afield(id,change)
    
})

//adding item
app.post('/api/orders', async(req,res)=>{
try {
    const order = await Order.create(req.body)
    res.status(200).json(order)
    console.log("item added")
} catch (error) {
    console.log("cant post to database")
}

})
//deleting
app.delete('/api/orders/:id',async(req,res)=>{
    const {id} = req.params;
    try {
        Order.delete(id)
        res.send({message:"deleted"})
    } catch (error) {
        console.log(error)
    }
})


mongoose.connect('mongodb+srv://admin:anasanas@cluster0.vumdt.mongodb.net/node?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {console.log('Connected!')
    app.listen(3000,(req,res)=>{
        console.log("app running on port 3000")
    })
  })
.catch(()=>{
    console.log('failed!')
})




function update_afield(id,change){
    try {
        Order.updateOne({ id: id }, { $set: { no_items: change,userid:change } })
        .then(result => {
            console.log('Updated documents:', result);
        })
    } catch (error) {
        console.log(error)
    }
}




