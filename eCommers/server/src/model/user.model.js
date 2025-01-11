const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    surname: { type: String, required: true },
    fullName: { type: String, required: true },
    fatherName:{type: String, required: true},
    motherName: { type: String, required: true },
    birthDate: { type: Date, required: true },
    email: { type: String },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
      message: "{VALUE} is not a valid of Gender",
    },
    mobile: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid mobile number!`,
      },
    },
    aadhar: {
      type: Number,
      required: function () {
        return this.role === "Teacher" || this.role === "Student"; 
      },
      validate: {
        validator: function (v) {
          return /^\d{12}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid Aadhar number!`,
      },
    },
    nameAsPerAadhar: {
      type: String,
      required: function () {
        return this.role === "Teacher" || this.role === "Student";
      },unique:true
    },
    GR: {
      type: Number,
      required: function () {
        return this.role === "Student";
      },unique:true
    },
    bloodgroup: {
      type: String,
      required: true,
      enum: ["A+", "B+","B-", "A-", "B+", "AB+", "AB-", "O+", "O-"],
      message: "{VALUE} is not a valid blood group",
    },
    cast: {
      type: String,
      required: function () {
        return this.role === "Teacher" || this.role === "Student";
      },
      enum: ["General", "OBC", "SC", "ST", "EWS"],
      message: "{VALUE} is not a valid caste",
    },
    standard: {
      type: Number,
      required: function () {
        return this.role === "Student";
      },
      enum: [0,1,2,3,4,5,6,7,8],
      message: "{VALUE} is not a valid standard",
    },
    classGroup: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
      enum: ["0","1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A","1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B"],
      message: "{VALUE} is not a valid class",
    },
    religion: {
      type: String,
      required: function () {
        return this.role === "Teacher" || this.role === "Student";
      },
      enum: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain"],
      message: "{VALUE} is not a valid religion",
    },
    physicallyHandicapped: {
      type: String,
      required: function () {
        return this.role === "Teacher" || this.role === "Student";
      },
      enum: ["Yes", "No"],
      message: "{VALUE} must be either 'Yes' or 'No'",
    },
    role: {
      type: String,
      required: true,
      enum: ["Student", "Teacher", "Admin"], // Restrict to "Student" only
      message: "{VALUE} is not a valid role",
    },
    classTeacherName: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
    },
    address: {
      village: { type: String },
      taluko: { type: String, required: true },
      district: { type: String, required: true },
      pincode: {
        type: String,
        required: true,
        validate: {
          validator: function (v) {
            return /^\d{6}$/.test(v);
          },
          message: (props) => `${props.value} is not a valid PIN code!`,
        },
      },
    },
    rollNumber: {
      type: Number,
      required: function () {
        return this.role === "Student";
      },
    },
    teachingStandard: {
      type: String,
      required: function () {
        return this.role === "Teacher";
      },
      enum: ["0", "1A", "2A", "3A", "4A", "5A", "6A", "7A", "8A","1B", "2B", "3B", "4B", "5B", "6B", "7B", "8B"],
      message: "{VALUE} is not a valid standard",
    },
    teacherCode: {
      type:  Number,
      required: function () {
        return this.role === "Teacher";
      },unique:true
    },
    password: { type: String, required: true }
  },
  { versionKey: false }
);

const UserModel = mongoose.model("users", userSchema);
module.exports = UserModel;
