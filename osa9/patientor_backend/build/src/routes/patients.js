"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const patientsService_1 = __importDefault(require("../services/patientsService"));
router.get('/', (_req, res) => {
    res.send(patientsService_1.default.nonSensitivePatients());
});
router.post('/', (_req, res) => {
    try {
        const { name, ssn, dateOfBirth, occupation, gender } = _req.body;
        const newPatient = patientsService_1.default.addPatient({
            name,
            ssn,
            dateOfBirth,
            occupation,
            gender
        });
        res.json(newPatient);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = router;
