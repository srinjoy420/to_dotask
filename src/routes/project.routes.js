import {Router} from "express";
import {createproject,getProjects,deleteproject} from "../controllers/project.conreollers.js";
import {isLoggedin,isAdmin} from "../middlewares/auth.middleware.js"

const router = Router();
router.route("/createproject").post(isLoggedin,createproject)
router.route("/getprojects/:id").get(isLoggedin,isAdmin,getProjects)
router.route("/deleteproject").post(deleteproject)



export default router;