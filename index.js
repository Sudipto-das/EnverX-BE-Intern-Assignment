const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

app.listen(port,()=>{
    console.log(`app listening at http://localhost:${port}`)
})

mongoose.connect('mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/',{dbName:'BlogPost'})