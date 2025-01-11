export const adminMiddleware = (req, res, next) => {
    if (req.user.userType !== "admin") {
        return res.status(403).json({ message: "Access denied. Only admin users can perform this action." });
    }
    next();
}