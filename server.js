require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());
app.options('*', cors())
app.disable('x-powered-by');

const mongoose = require('mongoose');
const mongoOptions = {
    keepAlive: 1,
    useUnifiedTopology: true,
    useNewUrlParser: true,
};
require('./models/Information');
mongoose.connect(process.env.MONGO_DATASOURCE, mongoOptions);
const Information = mongoose.model('Information');

app.get('/api/informations', async (req, res) => {
    const data = await Information.find().sort({ "timestamp": -1 });
    res.json(data);
    console.log(`Consulta realizada ${new Date()}`);
});

app.listen(process.env.PORT || 3000);
console.log(`Listen on: http://localhost:${process.env.PORT}/`);
