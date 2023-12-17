//Required framework/dependencies installation
const express = require('express')
const cors = require('cors'); 
const bodyParser = require('body-parser');
const router = require('./Router/router')
const connectDB = require('./Database/db-connectivity')


const app = express()
const PORT = process.env.PORT || 4000;
//enabling cross origin site interaction
app.use(cors());
//
app.use(bodyParser.json());
//configuring api(parent) router
app.use("/api",router);
//Database connection establishment
connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`)
})