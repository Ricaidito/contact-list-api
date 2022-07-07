import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import errorHandler from "./config/errorhandler.js";
import contactRoutes from "./routes/contacts.routes.js";
import usersRoutes from "./routes/users.routes.js";

const app = express();
const port = process.env.PORT || 8000;

// Database connection
mongoose.connect(process.env.MONGO_CONNECTION);

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

// Routes
app.use("/contacts", contactRoutes);
app.use("/users", usersRoutes);

// Error handling
app.use(errorHandler.routeNotFoundHandler);
app.use(errorHandler.generalErrorHandler);

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
