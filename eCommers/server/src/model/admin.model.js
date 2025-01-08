const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  username: { type: String, required: true },
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
  role: { 
    type: String, 
    required: true, 
    enum: ["Admin"],
    message: "{VALUE} is not a valid role" 
  },
  password: { type: String, required: true }
});


// Pre-save middleware to hash password
adminSchema.pre("save", async function (next) {
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

const AdminModel = mongoose.model("admin", adminSchema);
module.exports = AdminModel;
