import express from "express";
const router = express.Router();
export default router;

import { createUser, authenticateUser, getUserById, updateUser  } from "#db/queries/users";
import { addUserDevice, getAllUserDevices, updateUserDevice, deleteUserDevice } from "#db/queries/user_devices";
import { getUtilities } from "#db/queries/utilities";
import { getAllDevices, updateDevices } from "#db/queries/devices";
import { getUserDeviceById } from "../db/queries/user_devices";

// User Registration endpoint
router
  .route("/register")
  // Middleware to make sure 'username' and 'password' are in the request body
  .post(requireBody(["username", "password"]), async (req, res)=>{
    const { username, password } = req.body;
    const user = await createUser(username, password);
    
    const token = createToken({ id: user.id });
    res.status(201).send(token);
  });


// User Login endpoint
router
  .route("/login")
  // Middleware to make sure 'username' and 'password' are in the request body
  .post(requireBody(["username", "password"]), async (req, res) =>{
    const { username, password } = req.body;
    const user =  await authenticateUser(username, password);
    if (!user) return res.status(401).send("Invalid email or password")
    
      const token = createToken({ id: user.id });
    res.send(token);
  });

// User devices endpoint
router
  .route("/home")
  .get(async (req, res) => {
  const userDevices = await getUserDevicesById(req.user.id);
  res.send(userDevices);
});

