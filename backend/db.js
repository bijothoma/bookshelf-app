const mongoose = require("mongoose");

//connecting to Mongodb
module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    mongoose.connect(process.env.DB, connectionParams);
    console.log("Connected to mongodb...");
  } catch (e) {
    console.log(e);
    console.log("Error in connecting to mongodb");
  }
};
