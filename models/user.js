const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");
const { ObjectId } = mongoose.Schema;



const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      //required: true,
      maxlength: 32,
      trim: true,
    },
    lastname: {
      type: String,
      //required: true,
      maxlength: 32,
      trim: true,
    },
   course:{
    type: String,
    //required: true,
    trim:true
   },
   level:{
    type: Number,
    //required: true,
   },
   gender:{
    type: String,
    //required: true
   },
   campus:{
    type: String,
    required: true,
   },
    email: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: null,
      required:true
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);


