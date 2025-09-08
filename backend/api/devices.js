import express from "express";
const router = express.Router();
export default router;

import { createDevice, getDevices, getDeviceById, updateDevice, deleteDevice } from "./db/queries/devices.js";

// Create Device
router.route("/devices").get(async (req, res) => {
  const addDevice = await createDevice();
  res.send(addDevice);
});

router.param("id", async (req, res, next, id) => {
  const patient = await getPatientById(id);
  if (!patient) return res.status(404).send("Patient not found.");

  req.patient = patient;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.patient);
});

router.route("/:id/appointments").get(async (req, res) => {
  const appointments = await getAppointmentsByPatientId(req.patient.id);
  res.send(appointments);
});

router.route("/:id/doctors").get(async (req, res) => {
  const doctors = await getDoctorsByPatientId(req.patient.id);
  res.send(doctors);
});


