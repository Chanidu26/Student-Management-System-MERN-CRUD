import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({//defined schema using name of UserSchema
    name: String,
    age: Number,
    gpa: Number,
    
});

const UserModel = mongoose.model('students', UserSchema); // Corrected model definition

export default UserModel;






