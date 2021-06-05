"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const uuid_1 = require("uuid");
const patients = patients_json_1.default;
const nonSensitivePatients = () => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addPatient = (entry) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, entry);
    patients.push(newPatient);
    return newPatient;
};
exports.default = {
    nonSensitivePatients,
    addPatient
};
