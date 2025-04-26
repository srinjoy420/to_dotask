import {Router} from "express";
import {createproject,getProjects,deleteproject} from "../controllers/project.conreollers.js";
import {isLoggedin} from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/createproject").post(isLoggedin,createproject)
router.route("/getprojects").get(isLoggedin,getProjects)
router.route("/deleteproject").post(deleteproject)



export default router;