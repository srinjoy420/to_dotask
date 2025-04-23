import mongoose,{Schema} from "mongoose";
import {AvalibleTaskStatus,TaskStatusEnum} from "../utils/constants.js"

const taskSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        required:true
    },
    assigmentTo:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    asigmentby:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    Status:{
        type:String,
        enum:AvalibleTaskStatus,
        default:TaskStatusEnum.TODO

    },
    attachments:{
        type:[
            {
                url:String,
                mimTtype:String,
                size:Number
            }

        ],
        default:[]
    }

},{timestamps:true})

export const Task=mongoose.model("Task",taskSchema)