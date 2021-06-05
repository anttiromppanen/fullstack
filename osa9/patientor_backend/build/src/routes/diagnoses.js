"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const diagnosesService_1 = __importDefault(require("../services/diagnosesService"));
router.get('/', (_req, res) => {
    res.send(diagnosesService_1.default.getEntries());
});
exports.default = router;
