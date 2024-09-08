import {Schema, model} from "mongoose"
import {Users} from "./userInterface"

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