const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user.model');
const jwt = require('jsonwebtoken')

const app = express();
const cors = require('cors')

app.use(express.json())
app.use(cors());

mongoose.connect('mongodb+srv://admin:admin@cluster0.8rxkt.mongodb.net/mern-stack?retryWrites=true&w=majority')


app.listen(5000,()=>{
    console.log('server running');
})

app.post('/register', async (req,res)=>{

    try {
        const user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
        })
        console.log(user);
        res.json({status:'ok'})
    } catch (error) {

        res.json({status:'error',error:'duplicate email'})
        
    }
})

app.post('/login', async (req,res)=>{

    const user = await User.findOne({email:req.body.email,password:req.body.password})
    if(user){

        const token = jwt.sign({
            name:user.name,
            email:user.email

        },'aashir123')
        return res.json({status:'ok',user:token})
    } else{
        return res.json({status:'error',user:false})
    }
})

app.get('/',(req,res)=>{
    res.send('hello world')
})