import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { getBooking, getSingleBooking, createBooking, deleteBooking, editBooking } from "./controllers/booking_controller.js";
import { getService, getSingleService, createService, deleteService } from "./controllers/service_controller.js";
import { logger } from "./middleware/logger_middleware.js";
import { connectDB } from "./db/prismaClient.js";
import { forgotPassword, login, register, resetPassword } from "./controllers/JWT_controller.js";
import { getUsers } from "./controllers/user_controller.js";
import { authenticateToken, isAdmin, ownerShip } from "./middleware/JWT_middleware.js";

const port = process.env.PORT || 8000;
const host = process.env.HOST || "127.0.0.1";
const app = express();
const allowedOrigins = [/^http:\/\/localhost:517\d$/, /^http:\/\/127\.0\.0\.1:517\d$/];

connectDB();

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.some((allowedOrigin) => allowedOrigin.test(origin))) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    }
}));
app.use(helmet());
app.use(express.json());
app.use(logger);

app.post("/auth/register", register);
app.post("/auth/login", login);
app.post("/auth/forgot-password", forgotPassword);
app.post("/auth/reset-password", resetPassword);

app.get("/users", authenticateToken, isAdmin, getUsers);

app.get("/services", getService);
app.get("/services/:id", getSingleService);
app.post("/services", authenticateToken, isAdmin, createService);
app.delete("/services/:id", authenticateToken, isAdmin, deleteService);

app.get("/bookings", authenticateToken, getBooking);
app.get("/bookings/:id", authenticateToken, ownerShip, getSingleBooking);
app.post("/bookings", authenticateToken, createBooking);
app.put("/bookings/:id", authenticateToken, ownerShip, editBooking);
app.delete("/bookings/:id", authenticateToken, ownerShip, deleteBooking);

app.use((req, res) => {
    res.status(404).json({ message: "not found" });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong" });
});

const server = app.listen(port, host, () => {
    console.log(`Server listening on http://${host}:${port}`);
});

server.on("error", (error) => {
    console.error("Server failed to start:", error.message);
    process.exit(1);
});
