import express from "express";
import { getBusData } from "../controllers/busController.js";

const router = express.Router();

router.get("/", getBusData);

export default router;
