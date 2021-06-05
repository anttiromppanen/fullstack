/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import patientsData from '../../data/patients.json';
import {v1 as uuid} from 'uuid';

import { Patient, NonSensitivePatient, NewPatient, PublicPatient } from '../types';

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

const publicPatients = (): PublicPatient[] => {
  return patients.map(({ name, ssn, occupation, dateOfBirth, gender, entries, id }) => ({
    name,
    ssn,
    occupation,
    dateOfBirth,
    gender,
    entries,
    id
  }));
};

const addPatient = ( entry: NewPatient ): Patient => {
  const newPatient = {
    id: uuid(),
    entries: [],
    ...entry
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  nonSensitivePatients,
  addPatient,
  publicPatients
};

