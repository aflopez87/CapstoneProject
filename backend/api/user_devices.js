import express from "express";
const router = express.Router();
export default router;

import { createAppointment, getAppointments } from "#db/queries/appointments";

router
  .route("/")
  .get(async (req, res) => {
    const appointments = await getAppointments();
    res.send(appointments);
  })
  .post(async (req, res) => {
    if (!req.body) return res.status(400).send("Request body required.");

    const { patientId, doctorId, date, reason } = req.body;
    if (!patientId || !doctorId || !date || !reason) {
      return res
        .status(400)
        .send("Request body needs: patientId, doctorId, date, reason");
    }

    const appointment = await createAppointment(
      patientId,
      doctorId,
      date,
      reason,
    );
    res.status(201).send(appointment);
  });
