const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

//Connect to the DB
mongoose.connect('mongodb://localhost:27017/catmaps', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'));


//Cat Schema

const catSchema = new mongoose.Schema({
    name: String,
    breed: String,
    sex: String,
    temperament: String,
    age: Number,
    friendly: Boolean,
    image: String,
    userID: {type :String, required: true},
});

const Cat = mongoose.model('Cat', catSchema);

//Routes

