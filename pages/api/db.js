import mongoose from "mongoose";
const dbConnect = async () =>
  mongoose.connect(
    "mongodb+srv://demo:demo123@cluster0.gjuzy.mongodb.net/UserDB?retryWrites=true&w=majority"
  );

export default dbConnect;
