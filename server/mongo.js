const mongoose = require("mongoose");
let env = process.env.NODE_ENV || "development";
const config = require("./config/mongo.json")[env];

module.exports = () => {
  var envUrl = process.env[config.use_env_variable];
  var localUrl = `mongodb://${config.host}/${config.database}`;
  var mongoUrl = envUrl ? envUrl : localUrl;
  return mongoose.connect(mongoUrl);
};