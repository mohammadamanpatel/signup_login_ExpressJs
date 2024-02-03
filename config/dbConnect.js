const mongoose = require('mongoose')
exports.dbConnect = async()=>{
  mongoose.connect(process.env.mongoUrl)
  .then((conn)=>{
    console.log(`dbConnection success with host ${conn.connection.host}`);
  })
  .catch((error)=>{
    console.error(error.message)
    process.exit(1)
  })
}