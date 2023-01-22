export default function redirectQuery(request, response, next) {
    if (typeof request.query.redirectTo !== "string" || !request.query.redirectTo) {
        response.status(400);
        return next("Missing redirectTo query string parameter");
    }
    next();
}
