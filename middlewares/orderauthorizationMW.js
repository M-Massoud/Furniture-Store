const adminAuthoize = (request, response, next) => {
    if (request.role == "admin")
        next()
    else {
        let error = new Error("Not authorized (For Admins Only)");
        error.status = 403;
        next(error);
    }
};

const userAuthoize = (request, response, next) => {
    if ((request.role == "admin") || (request.role == "user")) {
        next();
        // console.log(request.params.id);
    }   
    else {
        let error = new Error("Not authorized ");
        error.status = 403;
        next(error);
    }
}
module.exports.adminAuthoize = adminAuthoize;
module.exports.userAuthoize= userAuthoize;