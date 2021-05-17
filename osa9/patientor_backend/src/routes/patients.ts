import express from 'express';

const router = express.Router();

import patientsService from '../services/patientsService';

router.get('/', (_req, res) => {
  res.send(patientsService.nonSensitivePatients());
});

router.post('/', (_req, res) => {
  
});

export default router;