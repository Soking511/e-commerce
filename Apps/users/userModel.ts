import {Schema, model} from "mongoose"
import {Users} from "./userInterface"
import bcrypt from 'bcryptjs';

const usersSchema = new Schema<Users>({
  name: {type:String, required:true},
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
  resetCodeVerify: Boolean,
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'products' }],
  address: [{
    street: String,
    city: String,
    state: String,
    postalCode: String
  }],
}, {timestamps: true} )


usersSchema.pre<Users>('save', async function (next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
})

export default model<Users>( 'users', usersSchema )