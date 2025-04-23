function asyncHandler(requestHandler) {
    return function (req, res, next) {
        Promise.resolve(requestHandler(req, res, next))
            .catch(function (err) {
                next(err);
            })

    }

}
export { asyncHandler }

//requestHandler is the parameter and we can pass this