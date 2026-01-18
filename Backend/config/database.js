import mongoose from "mongoose";

const connectDatabase = () => {
    // Options object removed here
    mongoose.connect(process.env.DB_LOCAL_URI).then(con => {
        console.log(`MongoDB is connected to the host: ${con.connection.host}`)
    })
}


export default connectDatabase;