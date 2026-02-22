"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const database_1 = __importDefault(require("./config/database"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const sparePartRoutes_1 = __importDefault(require("./routes/sparePartRoutes"));
const saleRoutes_1 = __importDefault(require("./routes/saleRoutes"));
const returnRoutes_1 = __importDefault(require("./routes/returnRoutes"));
const motorCertificateRoutes_1 = __importDefault(require("./routes/motorCertificateRoutes"));
const generalPowerOfAttorneyRoutes_1 = __importDefault(require("./routes/generalPowerOfAttorneyRoutes"));
const registeredContractRoutes_1 = __importDefault(require("./routes/registeredContractRoutes"));
(0, database_1.default)();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.options(/.*/, (0, cors_1.default)());
app.use(express_1.default.json());
// Serve uploaded images statically
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.get("/", (_req, res) => {
    res.send("API is running");
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/spare-parts", sparePartRoutes_1.default);
app.use("/api/sales", saleRoutes_1.default);
app.use("/api/returns", returnRoutes_1.default);
app.use("/api/motor-certificates", motorCertificateRoutes_1.default);
app.use("/api/general-power-of-attorneys", generalPowerOfAttorneyRoutes_1.default);
app.use("/api/registered-contracts", registeredContractRoutes_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map