export default function requireAdmin(req, res, next) {
  // Ensure user is authenticated
  if (!req.user) {
    return res.status(401).send("Unauthorized: No user found");
  }

  // Check if user has admin privileges
  if (req.user.role !== "admin") {
    return res.status(403).send("Forbidden: Admin access required");
  }

  // User is an admin — proceed to next middleware or route
  next();
}
