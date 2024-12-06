import express from "express";
import cors from "cors";
import busRoutes from "./routes/busRoutes.js";
import parkingRoutes from "./routes/parkingRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import requestLogger from "./middlewares/requestLogger.js";
import stopsRoutes from "./routes/stopsRoutes.js";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/bus", busRoutes);
app.use("/api/parking", parkingRoutes);
app.use("/api/trip", tripRoutes);
app.use("/api/stops", stopsRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
