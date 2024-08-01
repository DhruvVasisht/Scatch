const express=require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt=require('bcrypt');
require('dotenv');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true}));


app.get('/', (req, res) => {
    res.render('index');
})

app.listen(3000,(req,res) => {
    console.log('Server is running on port 3000');
})