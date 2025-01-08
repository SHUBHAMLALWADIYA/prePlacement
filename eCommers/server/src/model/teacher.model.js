const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  username: { type: String, required: true },
  role: {
    type: String,
    required: true,
    default:"Teacher"
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
  birthDate: { type: Date, required: true },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
    message: "{VALUE} is not a valid of Gender",
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
  password: { type: String, required: true },
  teachingstandard: {
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
  teacherCode:{type:String,require:true}
});


// Pre-save middleware to hash password
teacherSchema.pre("save", async function (next) {
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

const TeacherModel = mongoose.model("teachers", teacherSchema);
module.exports = TeacherModel;
