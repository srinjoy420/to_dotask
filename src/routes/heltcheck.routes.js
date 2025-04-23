import {Router} from "express";

import{helthCheck} from "../controllers/helthcheck.controllers.js"

const router = Router();

router.route("/").get(helthCheck);



export default router;