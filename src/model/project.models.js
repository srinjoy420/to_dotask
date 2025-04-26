import mongoose,{Schema} from "mongoose";

const projectSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:[true,"name must be unique"],
        trim:true
    },
    deacription:{
        type:String,
        required:true
        
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timeseries:true});

export const Project=mongoose.model("Project",projectSchema)