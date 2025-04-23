import { body } from "express-validator";

const UserRegistrationValidator = () => {
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Email is not valid"),
        body("usename")
            .trim()
            .notEmpty().withMessage("Username is required")
            .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long")
            .isLength({ max: 13 }).withMessage("Username must be at most 13 characters long"),
        body("password")
            .trim()
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")

        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/).withMessage("Password must contain at least one uppercase letter, one lowercase letter, and one special character")


    ]
}

const UserLoginValidator = () => {
    return [
        body("email")
            .isEmail().withMessage("Email is not valid"),
        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({ min: 8 }).withMessage("Password must be at least 8 characters long")

    ]
}

export { UserRegistrationValidator,UserLoginValidator };