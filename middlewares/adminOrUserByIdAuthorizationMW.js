module.exports = (request, response, next) => {
    if ((request.role == "admin") || ((request.role == "user") && (request.id == request.params.id)))
        next()
    else {
        let error = new Error("Not authorized Access");
        error.status = 403;
        next(error);
    }
}