import mongoose from "mongoose";

const {Schema} = mongoose;

const buildingSchema = new Schema(
    {
        title:{
            type:String,
            required:true,
        },
        surface:{
            type:Number,
            required:true,
            min:0
        },
        category:{
            type:String,
            required:true
        },

    }
)