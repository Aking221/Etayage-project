import express from "express";
import { getParkingData } from "../controllers/parkingController.js";

const router = express.Router();

router.get("/", getParkingData);

export default router;
