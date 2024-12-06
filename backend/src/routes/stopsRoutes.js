import express from "express";
import { getStops } from "../controllers/stopsController.js";

const router = express.Router();

router.get("/", getStops);


export default router;
