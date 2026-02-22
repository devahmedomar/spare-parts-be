"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_1 = __importDefault(require("mongoose"));
const Admin_1 = __importDefault(require("../models/Admin"));
async function seed() {
    await mongoose_1.default.connect(process.env.MONGO_URI);
    const existing = await Admin_1.default.findOne({ username: "admin" });
    if (existing) {
        console.log("Admin already exists");
        process.exit(0);
    }
    const hashed = await bcrypt_1.default.hash("admin123", 10);
    await Admin_1.default.create({ username: "admin", password: hashed });
    console.log("Admin seeded: username=admin password=admin123");
    process.exit(0);
}
seed().catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
});
//# sourceMappingURL=seedAdmin.js.map