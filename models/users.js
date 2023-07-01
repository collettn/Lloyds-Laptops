import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    address: String,
    type: String
});

const User = mongoose.model('User', userSchema);

export default User;