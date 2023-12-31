const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: [3, "Name is too short"],
    maxLength: [10, "Name is too large"],
  },

  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: "Oops.. this is an invalid Email",
    },
  },

  password: {
    type: String,
    require: true,
    minLength: [6, "Password should be minimum 6 chars"],
  },

  roles: {
    type: [String],
    default: ["STUDENT"],
  },

  accountStatus: {
    type: String,
    enum: ["PENDING", "ACTIVE", "REJECT"],
    default: "PENDING",
  },
});

const User = model("User", userSchema);
module.exports = User;
