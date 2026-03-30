import express from "express";
import cors from "cors";
import breweryRoutes from "./routes/breweryRoutes.js";
import authRoutes from "./routes/auth.js";
import dotenv from "dotenv";
import path from "path";

// Load .env reliably from project root
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/api/breweries", breweryRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;