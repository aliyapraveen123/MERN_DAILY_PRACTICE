import mongoose from "mongoose"

const connectDB = async ()  => {
  try{  
   await mongoose.connect(process.env.MONGO_URI)
   console.log("db connected successfully");
  }
  catch(error){
    console.log("db connection failded", error.message);
    
  }
   
}
export {connectDB}