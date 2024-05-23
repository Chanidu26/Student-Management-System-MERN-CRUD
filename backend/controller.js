import UserModel from './models/Users.js';

const getusers = (req,res)=>{
    UserModel.find()
    .then(students=>res.json(students))
    .catch(err=>res.json(err))
}

const getuserbyid = (req,res)=>{
    const { id } = req.params
    UserModel.findById(id)
    .then(student =>{
       if (student){
           res.json(student);
       }
       
       else{
           res.status(404).json({ message: 'User not found' });
       }
    })
    .catch(err => res.status(500).json({ error: err.message }));
}

const adduser =(req,res)=>{
    const user = req.body;
    UserModel.create(user)
    .then(data => res.json({ message: 'User has been created successfully', user: data }))
    .catch(err => res.status(500).json(err)); // Handle potential errors
}

const deleteuserbyid =(req,res)=>{
    const { id } = req.params
    UserModel.findByIdAndDelete(id)
   .then(student =>{
       if (student){
           res.json(student);
       }
       else{
           res.status(404).json({ message: 'User not found' });
       }
    })
   .catch(err => res.status(500).json({ error: err.message }));
}


const updateuserbyid =(req,res)=>{
    const { id } = req.params
     UserModel.findByIdAndUpdate(id, req.body)
    .then(student =>{
        if (student){
            res.json(student);
        }
        else{
            res.status(404).json({ message: 'User not found' });
        }
     })
    .catch(err => res.status(500).json({ error: err.message }));
}

export {getusers,getuserbyid,deleteuserbyid,updateuserbyid,adduser};
