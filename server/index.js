import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import eventModal from './eventModal.js';
import userModel from './userModel.js';

// Config
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors())

// Database
const connection_Url = 'mongodb+srv://ahtisham:1234@cluster0.jj67twe.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connection_Url, {
    useNewUrlParser: true
}).then(() => {
    console.log('Connection Successful');
})


// Routers

//getting data from database 
app.get('/', (req, res) => {
    eventModal.find({}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data)
        }
    })

})

// posting data into database
app.post('/addevent', (req, res) => {
    const event = req.body;

    eventModal.create(event, (err, data) => {
        if (err) {
            res.status(500).send("Event is not added try again");
        } else {
            res.status(201).send('Event added Successfully');
        }
    })
})

// Updating data
app.put('/update', (req, res) => {
    const { _id, eventName, eventDescription, eventType, privateUsers } = req.body;
    eventModal.findById(_id, async (err, event) => {
        if (!err) {
            event.eventName = eventName;
            event.eventDescription = eventDescription;
            event.eventType = eventType;
            event.privateUsers = privateUsers;
            await event.save();
            res.send('Event Updated Successfully')
        } else {
            res.send('Getting Errors from Server')
        }
    })
})

// Deleting data
app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await eventModal.findByIdAndRemove(id).exec();
    res.status(200).send("Deleted Successfully");
})




// Routers for login and registeration
app.post('/register', async(req, res)=>{
    const newUser = req.body;

    const isExist = await userModel.findOne({username: newUser.username});

    if(isExist){
        res.json('User Already Exist');
    }else{
        userModel.create(newUser, (err, data)=>{
            if(err){
                res.json('internal issues please try again later')
            }
            else{
                res.json({message:'User has been registered successfully', username: data.username})
            }
        })
    }
})


app.post('/login', async(req,res)=>{
    const loginUser = req.body;

    const isExist = await userModel.findOne({username: loginUser.username, password: loginUser.password});
    if(isExist){
        console.log(isExist)
        res.json({message:"User login successfully", username: loginUser.username});
    }
    else{
        res.json({message: 'invalid email or password'});
    }
})

app.get('/getusers', (req, res)=>{
    userModel.find({}, (err, data)=>{
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    })
})





// Listen
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})