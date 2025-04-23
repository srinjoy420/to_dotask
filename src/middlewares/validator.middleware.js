import { validationResult } from "express-validator";
import { ApiError } from "../utils/api-error.js";
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    console.log(errors);


    const extractedError = []
    //push all errors in exractedError array
    errors.array().map((err) => extractedError.push({
        [err.path]: err.msg
    }))

    throw new ApiError(422, "recived data is not valid", extractedError)



}