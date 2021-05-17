/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';

import { Patient, NonSensitivePatient, NewPatient } from '../types';

const patients: Array<Patient> = patientsData;

const nonSensitivePatients = (): NonSensitivePatient [] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  nonSensitivePatients,
  addPatient
};

