import mongoose,{Schema} from "mongoose";

const projectNotesSchema = new Schema({
    project:{
        type:Schema.Types.ObjectId,
        ref:"Project",
        reqired:true
    },
    createdby:{
        type:Schema.type.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String,
        required:true

    }
},{timeseries:true})

export const projectNote=mongoose.model("projectNote",projectNotesSchema)