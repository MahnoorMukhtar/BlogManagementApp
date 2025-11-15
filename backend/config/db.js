const mongoose = require("mongoose")

function connectDb(){
    mongoose.connect(`${process.env.MONGODB_URL}`)
    .then(()=>{
        console.log("Mongodb connection established")
    })
    .catch((err)=>{
        console.error("Error in connecting to Mongodb", err.message)
    })
}


module.exports = connectDb;