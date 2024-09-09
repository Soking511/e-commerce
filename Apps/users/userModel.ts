import {Schema, model} from "mongoose"
import {Users} from "./userInterface"
import bcrypt from 'bcryptjs';

const usersSchema = new Schema<Users>({
  Name: {type:String, required:true},
  email: {type:String, unique: true, required:true},
  password: {type:String, required:true},
  phoneNumber: String,
  verified: Boolean,
  role:{type: String, enum:['manager', 'admin', 'user'], default:'user'},
  image: String,
  phone: {type:String},
  active: {type: Boolean, default: true},
  resetCode: String,
  passwordChangedAt: Date,
  resetCodeExpireTime: Date,
  resetCodeVerify: Boolean
}, {timestamps: true} )

export default model<Users>( 'users', usersSchema )

usersSchema.pre<Users>( 'save', async function (next) {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password, 13);
  
  next()
} )