const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
const bcryptSalt = process.env.BCRYPT_SALT;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  },
},
{
  timestamps: true
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }
  const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
  this.password = hash
  next()
});

module.exports = mongoose.model('User', userSchema)