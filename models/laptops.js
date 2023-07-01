import mongoose, { Schema } from "mongoose";

const laptopSchema = new mongoose.Schema({
    model: {type: String, required: true},
    manufacturer: {type: String, required: true},
    cpu: String,
    disk: String,
    memory: String,
    usage: String,
    status: String,
    user: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Laptop = mongoose.model('Laptop', laptopSchema);

export default Laptop;