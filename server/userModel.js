import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    username: {type: String, require: true},
    password: {type: String, require: true},
})

export default mongoose.model('users', userModel);