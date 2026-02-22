import express from "express";
import "express-async-errors";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

dotenv.config();

import connectDB from "./config/database";

import authRoutes from "./routes/authRoutes";
import sparePartRoutes from "./routes/sparePartRoutes";
import saleRoutes from "./routes/saleRoutes";
import returnRoutes from "./routes/returnRoutes";
import motorCertificateRoutes from "./routes/motorCertificateRoutes";
import generalPowerOfAttorneyRoutes from "./routes/generalPowerOfAttorneyRoutes";
import registeredContractRoutes from "./routes/registeredContractRoutes";

connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.options(/.*/, cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (_req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/spare-parts", sparePartRoutes);
app.use("/api/sales", saleRoutes);
app.use("/api/returns", returnRoutes);
app.use("/api/motor-certificates", motorCertificateRoutes);
app.use("/api/general-power-of-attorneys", generalPowerOfAttorneyRoutes);
app.use("/api/registered-contracts", registeredContractRoutes);

export default app;
