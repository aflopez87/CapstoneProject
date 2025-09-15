import express from "express";
const router = express.Router();

// Middleware imports
import getUserFromToken from "../middleware/user_from_token.js"; 
import requireUser from "../middleware/require_user.js";         
import requireAdmin from "../middleware/require_admin.js";       
import requireBody from "../middleware/require_body.js";

// JWT utility
// generates auth token
import { createToken } from "../utils/jwt.js";

// Users imports
import {
  getAllUsers,
  // getUserById,
  deleteUser,
  authenticateUser
} from "../db/queries/users.js";

// User devices imports
import {
  getDevicesByUserId
} from "../db/queries/user_devices.js";

// Devices imports
import {
  getDevices,
  // getDeviceById,
  updateDevice,
  deleteDevice,
  createDevice
} from "../db/queries/devices.js";

// Utilities imports
import {
  getUtilities,
  // getUtilityById,
  updateUtility,
  deleteUtility,
  createUtility
} from "../db/queries/utilities.js";
 

// Admin Login
router
  .route("/login")
  .post(requireBody([ "username", "password" ]), async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    // Returns error if not a registered user or admin
    if (!user || user.role !== "admin") return res.status(403).send("Forbidden");
    const token = createToken({ id: user.id, role: user.role });
    res.send(token);
  });

// Apply token and role check to all admin routes
router.use(getUserFromToken);
// blocks unauthenticated access
router.use(requireUser);      
// blocks non-admin users
router.use(requireAdmin);  

// ADMIN USER
// Get all users
router
  .route("/users")
  .get(async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
  });

// Get a user's devices
router
  .route("/users/:userId/devices")
  .get(async (req, res) => {
    const devices = await getDevicesByUserId(req.params.userId);
    res.send(devices);
  });

// Delete a user by user ID
router
  .route("/users/:userId")
  .delete(async (req, res) => {
    const deleted = await deleteUser(req.params.userId);
    if (!deleted) return res.status(404).send("User not found");
    res.send(deleted);
  });


// DEVICES
// View all verified devices
router
  .route("/devices")
  .get(async (req, res) => {
    const devices = await getDevices();
    res.send(devices);
  });

// Add a new verified device
router
  .route("/devices")
  .post(requireBody([ "name", "wattage" ]), async (req, res) => {
    const device = await createDevice(req.body);
    res.status(201).send(device);
  });

// Update or verify a device by device ID
router
  .route("/devices/:deviceId")
  .patch(async (req, res) => {
    const updated = await updateDevice(req.params.deviceId, req.body);
    // If no fields updated, return message
    if (!updated) return res.status(400).send("No fields to update");
    res.send(updated);
  });

// Delete a device by device ID
router
  .route("/devices/:deviceId")
  .delete(async (req, res) => {
    const deleted = await deleteDevice(req.params.deviceId);
    // If device not found to delete, send message
    if (!deleted) return res.status(404).send("Device not found");
    res.send(deleted);
  });

// UTILITIES
// View all utilities
router
  .route("/utilities")
  .get(async (req, res) => {
    const utilities = await getUtilities();
    res.send(utilities);
  });

// Add new utility
router
  .route("/utilities")
  .post(requireBody([ "name", "location", "peakRate", "offPeakRate" ]), async (req, res) => {
    const utility = await createUtility(req.body);
    res.status(201).send(utility);
  });

// Update a utility
router
  .route("/utilities/:utilityId")
  .patch(async (req, res) => {
    const updated = await updateUtility(req.params.utilityId, req.body);
    if (!updated) return res.status(400).send("No fields to update");
    res.send(updated);
  });

// Delete a utility
router
  .route("/utilities/:utilityId")
  .delete(async (req, res) => {
    const deleted = await deleteUtility(req.params.utilityId);
    if (!deleted) return res.status(404).send("Utility not found");
    res.send(deleted);
  });

export default router; 