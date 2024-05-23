import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import UserModel from './models/Users.js';
import {getusers,getuserbyid, deleteuserbyid, updateuserbyid,adduser} from './controller.js';


const app = express()
app.use(cors())
app.use(express.json())
const PORT = process.env.PORT ||8000

app.get('/',(req,res)=>{
    res.send('hello world and ello')
})

mongoose.connect("mongodb://localhost:27017/school")

app.get('/users',getusers)

app.get('/users/:id',getuserbyid)

app.delete('/users/:id', deleteuserbyid)

app.put('/users/:id', updateuserbyid)

app.post('/users',adduser)


app.listen(PORT,()=>{
    console.log(`app is listning on post ${PORT}`)
})

