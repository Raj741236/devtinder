const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 50,
      index: true,
    },
    lastName: {
      type: String,
      trim: true,
      index: true,
    },
    emailId: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          if (!validator.isEmail(value)) {
            throw new Error("Enter a valid Email ID");
          }
        },
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      trim: true,
      validate: {
        validator: (value) => {
          console.log("came in gender");
          if (!["Male", "Female", "Others"].includes(value)) {
            throw new Error("Gender not valid");
          }
        },
      },
    },
    photoUrl: {
      type: String,
      trim: true,
      default:
        "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
    },
    about: {
      type: String,
      trim: true,
      default: "Default user about description",
    },
    skills: {
      type: [String],
      validate: {
        validator: (value) => {
          if (value?.length >= 10) {
            throw new Error("Skills are restricted to only 10");
          }
        },
      },
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;
  const jwtToken = await jwt.sign({ _id: user._id }, "DEV-TINDER$123");

  return jwtToken;
};

userSchema.methods.comparePassword = async function (passwordInputByUser) {
  const user = this;
  const userPasswordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    userPasswordHash,
  );
  return isPasswordValid;
};

userSchema.methods.compareNewPassword = async function (newPassword) {
  const user = this;
  const oldUserPasswordHash = user.password;

  const isIdenticalPassword = await bcrypt.compare(
    newPassword,
    oldUserPasswordHash,
  );

  return isIdenticalPassword;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
