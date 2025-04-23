import mongoose,{Schema} from "mongoose";
import {AvalibleUserRoles,UserRolesEnum} from "../utils/constants.js"

const projectMemberSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    role:{
        type:String,
        enum:AvalibleUserRoles,
        default:UserRolesEnum.MEMBER

    }
},{timeseries:true});

export const ProjectMember=mongoose.model("ProjectMember",projectMemberSchema)