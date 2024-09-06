import {Schema, model} from "mongoose"
import {User} from "./userInterface"

const userSchema = new Schema<User>({
  firstName: {type:String, required:true, trim:true },
  lastName: {type:String, required:true, trim:true },
  email: {type:String, required:true, trim:true },
  password: String,
  phoneNumber: String,
  image: String,
  verified: Boolean
}, {timestamps: true } )

export default model<User>( 'user', userSchema )