import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import "./config/cloudinary";
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

app.use(cors());
app.use(express.json());

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
