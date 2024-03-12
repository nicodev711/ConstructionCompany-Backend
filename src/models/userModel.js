import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        joined:{
            type:Date,
            default:Date.now
        },
        lastLogging:{
            type:Date,
            default:Date.now
        },
        money:{
            type:Number,
            default:10000
        },
        equipment:[{type:String}],
        buildings:[{type:String}],
        currentContract:[{type:String}],
        achievedContract:[{type: String}]
    }
)

const User = mongoose.model('User', UserSchema)

export default User;