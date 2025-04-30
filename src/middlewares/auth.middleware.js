import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

export const isLoggedin = async (req, res, next) => {
    try {
        console.log(req.cookies);
        const token = req.cookies?.generateAcessToken
        console.log("token found ", token ? "YES" : "NO");
        if (!token) {
            console.log("no token");
            return res.status(401).json({
                success: false,
                message: "cant found the token"
            })

        }
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log("decoded data", decoded);
        req.user = decoded;
        next()




    }
    catch (err) {
        console.log("auth middlewere failure");
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        


    }
    // next()



    

}

export const isAdmin = async (req, res, next) => {
    try {
        const userid=req.user?._id;
        const role=req.user?.role;
        if(!userid || role !=="ADMIN"){
            res.status(400).json({
                success:false,
                message:"you are not admin"
            })
        }
        next()
;
    } catch (error) {
        console.log("checkadmin middleware error",error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
        
        
    }
}