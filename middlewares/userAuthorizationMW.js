module.exports = (request, response, next) => {
    if (request.role == "user")
        next()
    else {
        let error = new Error("Not authorized");
        error.status = 403;
        next(error);
    }
}