const mongoose = require('mongoose');
const debug=require('debug')("development:mongoose-connection");
const connectDb =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        .then(()=>{
            debug('Connected to MongoDB');
        })
    }
    catch(err){
        console.log("MongoDB Connection error: ",err);
        process.exit(1);
    }
};

module.exports = connectDb;