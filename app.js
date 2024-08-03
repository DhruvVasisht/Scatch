const express=require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB=require("./config/mongoose-connection")
require('dotenv').config();
const ownerRouter = require('./routes/ownerRouter');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const indexRouter = require('./routes/index');
const expressSession = require("express-session");
const flash = require("connect-flash");

app.use(cookieParser());
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.use(express.static(path.join(__dirname, "public")))
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret:process.env.EXPRESS_SESSION_SECRET,
})
);
app.use(flash());

app.set('view engine', 'ejs');
connectDB();;


app.use('/',indexRouter)
app.use('/owner',ownerRouter);
app.use('/products',productRouter);
app.use('/users',userRouter);

app.listen(3000,(req,res) => {
    console.log('Server is running on port 3000');
})