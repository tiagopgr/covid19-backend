require("dotenv").config();
const express = require("express");
const app = express();

const mongoose = require('mongoose');
const mongoOptions = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
require('./models/Information');
mongoose.connect(process.env.MONGO_DATASOURCE, mongoOptions);
const Information = mongoose.model('Information');

app.use(express.urlencoded({ extended: false }));
app.get('/api/informations', async (req, res) => {
    const data = await Information.find().sort({ "timestamp": -1 });
    console.log(data);
    res.send(data);
});

app.listen(process.env.PORT || 3000);
console.log(`Listen on: http://localhost:${process.env.PORT}/`);
