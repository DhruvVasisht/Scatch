const express=require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cookie = require('cookie-parser');
const bcrypt=require('bcrypt');
const path = require('path');
const connectDB=require("./config/mongoose-connection")
require('dotenv').config();
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, "public")))

connectDB();;

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/owner',ownerRouter);
app.get('/products',productRouter);
app.get('/users',userRouter);

app.listen(3000,(req,res) => {
    console.log('Server is running on port 3000');
})