const mongoose = require("mongoose");

module.exports = async (arg) => {
    if (arg.connect == true){
        try{
            const connectionParams = { useNewUrlParser: true };
            await mongoose.connect(process.env.DB_URI, connectionParams);

            mongoose.connection.on("connected", () => {
                console.log("Connected to database sucessfully");
            });

            mongoose.connection.on("error", (err) => {
                console.log("Error while connecting to database :" + err);
            });

            mongoose.connection.on("disconnected", () => {
                console.log("Mongodb connection disconnected");
            });
        }catch(error){
            console.log("Database connectivity error")
        }
    }

    if(arg.connect == false){
        mongoose.connection.close()
    }
    
};