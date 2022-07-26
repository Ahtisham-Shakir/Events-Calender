import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    eventName : {
        type: String,
        required: true
    },
    eventDescription : {
        type: String,
        required: true
    },
    eventType : String,
    eventDate: String,
    privateUsers: Array
});

export default mongoose.model('events', eventSchema);