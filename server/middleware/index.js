// all the middleware goes here
var middlewareObj = {};     // define empty object

// To check user already loggedin or not
// which can be used to protect viewing pages from unlogged users
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({
        title: 'Authorization failed',
        message: 'Please login or sign up a new account!'
    });
}

module.exports = middlewareObj;