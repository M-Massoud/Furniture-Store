module.exports = (request, response, next) => {
    if (request.role == "admin")
        next()
    else {
        let error = new Error("Not authorized (For Admins Only)");
        error.status = 403;
        next(error);
    }
}