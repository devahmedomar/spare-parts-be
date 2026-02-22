"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
    }
    const admin = await models_1.Admin.findOne({ username });
    if (!admin) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const match = await bcrypt_1.default.compare(password, admin.password);
    if (!match) {
        res.status(401).json({ message: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
    });
    res.json({ token });
};
exports.login = login;
//# sourceMappingURL=authController.js.map