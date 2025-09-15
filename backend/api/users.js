// Express setup
import express from "express";
const router = express.Router();

// Middleware imports
import getUserFromToken from "../middleware/user_from_token.js"; 
import requireUser from "../middleware/require_user.js";       
import requireBody from "../middleware/require_body.js";        

// JWT utility
// generates auth token
import { createToken } from "../utils/jwt.js";

// User imports
import {
  createUser,
  authenticateUser,
  // getUserById,
  updateUser
} from "../db/queries/users.js";

// User devices imports
import {
  addUserDevice,
  // getAllUserDevices,
  updateUserDevice,
  deleteUserDevice
} from "../db/queries/user_devices.js";

// User devices import
import { getDevices } from "../db/queries/devices.js";

// Utilities import
import { getUtilities } from "../db/queries/utilities.js";

// Apply token middleware to all routes
router.use(getUserFromToken);

// Register new user
router
  .route("/register")
  .post(requireBody(["username", "password", "name", "location"]), async (req, res) => {
    const { username, password, name, location } = req.body;
    const user = await createUser({username, password, name, location});
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  });

// Login existing user
router
  .route("/login")
  .post(requireBody(["username", "password"]), async (req, res) => {
    const { username, password } = req.body;
    const user = await authenticateUser(username, password);
    // Send message if no user on file
    if (!user) return res.status(401).send("Invalid email or password");
    const token = createToken({ id: user.id });
    res.send(token);
  });

// Get user's devices (home page)
router
  .route("/home")
  .get(requireUser, async (req, res) => {
    const userDevices = await getDevicesByUserId(req.user.id);
    res.send(userDevices);
  });

// Add a new device for the user
router
  .route("/devices")
  .post(
    requireUser,
    requireBody(["deviceId", "customDevice", "usageAlgorithm", "usageHours"]),
    async (req, res) => {
      const { deviceId, customDevice, usageAlgorithm, usageHours } = req.body;
      const userDevice = await addUserDevice(
        req.user.id,
        deviceId,
        customDevice,
        usageAlgorithm,
        usageHours
      );
      res.status(201).send(userDevice);
    }
  );

// Update an existing user device by device ID
router
  .route("/devices/:deviceId")
  .put(
    requireUser,
    requireBody(["usageAlgorithm", "usageHours"]),
    async (req, res) => {
      const { deviceId } = req.params;
      const { usageAlgorithm, usageHours } = req.body;
      const updatedDevice = await updateUserDevice(
        req.user.id,
        deviceId,
        usageAlgorithm,
        usageHours
      );
      // Check for device, send message if not found
      if (!updatedDevice) return res.status(404).send("Device not found or failed to update.");
      res.send(updatedDevice);
    }
  );

// Delete a user device
router
  .route("/devices/:deviceId")
  .delete(requireUser, async (req, res) => {
    const { deviceId } = req.params;
    await deleteUserDevice(req.user.id, deviceId);
    res.sendStatus(204);
  });

// Get all verified devices
router
  .route("/devices/all")
  .get(requireUser, async (req, res) => {
    const devices = await getDevices();
    res.send(devices);
  });

// Get and update user's utility
router
  .route("/utilities")
  .get(requireUser, async (req, res) => {
    const utilities = await getUtilities();
    res.send(utilities);
  })
  .post(requireUser, requireBody(["utilityId"]), async (req, res) => {
    const { utilityId } = req.body;
    const updatedUser = await updateUser(req.user.id, { utilityId });
    res.send(updatedUser);
  });

export default router;
