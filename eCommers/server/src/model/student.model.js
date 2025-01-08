const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, required: true },
  motherName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
    message: "{VALUE} is not a valid of Gender",
  },
  mobile: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{10}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid mobile number!`,
    },
  },
  aadhar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Aadhar number!`,
    },
  },
  nameasaadhar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{12}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid Aadhar number!`,
    },
  },
  gr: { type: String, required: true },
  bloodgroup: {
    type: String,
    required: true,
    enum: ["+A", "+B", "-A", "-B", "+AB", "-AB", "+O", "-O"],
    message: "{VALUE} is not a valid blood group",
  },
  cast: {
    type: String,
    required: true,
    enum: ["General", "OBC", "SC", "ST", "EWS"],
    message: "{VALUE} is not a valid caste",
  },
  standard: {
    type: String,
    required: true,
    enum: ["0", "1", "2", "3", "4", "5", "6", "7", "8"],
    message: "{VALUE} is not a valid standard",
  },
  class: {
    type: String,
    required: true,
    enum: ["A", "B"],
    message: "{VALUE} is not a valid class",
  },
  religion: {
    type: String,
    required: true,
    enum: ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain"],
    message: "{VALUE} is not a valid religion",
  },
  physicallyHandicapped: {
    type: String,
    required: true,
    enum: ["Yes", "No"],
    message: "{VALUE} must be either 'Yes' or 'No'",
  },
  role: {
    type: String,
    default: "Student", // Default value for role
    enum: ["Student"], // Restrict to "Student" only
    message: "{VALUE} is not a valid role",
  },
  classteacher: {
    type: String,
    require: true,
  },
  address: {
    houseNo: { type: String },
    street: { type: String },
    city: { type: String, required: true },
    state: { type: String, required: true },
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
  rollNumber: { type: String, required: true },
});



// Pre-save middleware to hash password
studentSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
      try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      } catch (error) {
        return next(error);
      }
    }
    next();
  });

const StudentModel = mongoose.model("students", studentSchema);
module.exports = StudentModel;
