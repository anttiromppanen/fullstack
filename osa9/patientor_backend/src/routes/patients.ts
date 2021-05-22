/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

const router = express.Router();

import patientsService from '../services/patientsService';

router.get('/', (_req, res) => {
  res.send(patientsService.nonSensitivePatients());
});

router.post('/', (_req, res) => {
  try {
    const { name, ssn, dateOfBirth, occupation, gender } = _req.body;
    const newPatient = patientsService.addPatient({
      name,
      ssn,
      dateOfBirth,
      occupation,
      gender
    });

    res.json(newPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

export default router;