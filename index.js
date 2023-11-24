//Required framework/dependencies installation
const express = require('express')
const cors = require('cors'); 
const router = require('./Router/router')


const app = express()
const PORT = process.env.PORT || 4000;
//enabling cross origin site interaction
app.use(cors());
//configuring api(parent) router
app.use("/api",router);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Application listening on port ${PORT}`)
})