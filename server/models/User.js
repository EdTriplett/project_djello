const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  hashedPassword: {
    type: String,
  },
  boards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Board"
    }
  ]
}, {timestamps: true});

UserSchema.plugin(uniqueValidator);

UserSchema.virtual("password").set(function(value) {
  this.hashedPassword = bcrypt.hashSync(value, 12);
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.hashedPassword);
};

const User = mongoose.model("User", UserSchema);

module.exports = User