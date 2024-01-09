import mongoose from "mongoose";

export const Connection = async (username,password)=>{
    mongoose
      .connect(
        `mongodb://${username}:${password}@ac-4xx3vfs-shard-00-00.9qefcfh.mongodb.net:27017,ac-4xx3vfs-shard-00-01.9qefcfh.mongodb.net:27017,ac-4xx3vfs-shard-00-02.9qefcfh.mongodb.net:27017/?ssl=true&replicaSet=atlas-brwnjy-shard-0&authSource=admin&retryWrites=true&w=majority`,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log("Database Connected"))
      .catch((err) => console.log(err));
}

export default Connection;