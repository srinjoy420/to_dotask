import { asyncHandler } from "../utils/async-handeler.js";
import { Project } from "../model/project.models.js";
import User from "../model/user.models.js";
import { AvalibleUserRoles, UserRolesEnum } from "../utils/constants.js"

import {ApiError} from "../utils/api-error.js";
import {ApiResponse} from "../utils/api-response.js";
const createproject = asyncHandler(async (req, res) => {
    // console.log(req.user);
    
    const userid = req.user._id
    
    

    const { name, deacription } = req.body;
    if (!name || !deacription ) {
        res.status(400).json({
            message: "all fields are required"
        })
    }
    if (!userid) {
        return res.status(400).json({
            message: "user not exist please register then create project"
        })

    }
    const existproject = await Project.findOne({ name });
    if (existproject) {
        return res.status(400).json({
            message: "project is already exist"
        })

    }
    // create project
    try {
        const project = await Project.create({
            name,
            deacription,
            createdBy: userid
        })
        return res.status(200).json({
            message: "project created successfully",
            project
        })
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "project not created successfully",
        })


    }
})
const getProjects = async (req, res) => {
    const userId = req.user._id;

    const allProjects = await Project.find({createdBy:userId});
    if(!allProjects){
      return res.status(404).json(new ApiError(404,"Project not found."))
    }

    return res.status(200).json(new ApiResponse(200,"All project are here.",allProjects));
};
const deleteproject=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    const project=await Project.findOne({name});
    if(!project){
       return res.status(400).json(new ApiError(400,"project not find"))
    }
    
    
    await Project.deleteOne({name})
    return res.status(200).json(new ApiResponse(200,"delete the project"))



})
export { createproject,getProjects,deleteproject }