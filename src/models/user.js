const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
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

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
