const { default: mongoose } = require("mongoose");

let isConnected = false;

export const DBConnection = async () => {
    if (isConnected) {
        return;
    }
    try {
        const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
        const connectionString = `mongodb+srv://mohanpathuri7:${password}@cluster0.7p8grdq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // clustore url
        await mongoose.connect(connectionString);
        isConnected = true;
        console.log("Database connected")
    } catch (error) {
        console.log(error)
    }

}
