const { validateToken } = require("../services/authentication");

function checkForAuthenticationCookie(cookieName) {
    return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];

        if (!tokenCookieValue) {
            return next();
        }

        try {
            // Attempt to validate the token and set req.user
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload;
        } catch (error) {
            // If token validation fails, log the error and clear req.user
            console.error("Invalid token:", error.message);
           
        }

        // Proceed to the next middleware or route
       return next();
    };
}

module.exports = {
    checkForAuthenticationCookie,
};
