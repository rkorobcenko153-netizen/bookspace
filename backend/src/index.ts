import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import { setupSwagger } from "./lib/swagger";

const app  = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors({ origin: process.env.CORS_ORIGIN ?? "*" }));
app.use(express.json());

setupSwagger(app);
app.use("/api", router);

app.get("/health", (_, res) => res.json({ status: "ok" }));

app.use((req, res) => res.status(404).json({ success: false, message: "Not found" }));

app.listen(PORT, () => {
  console.log(`🚀 BookSpace API: http://localhost:${PORT}`);
  console.log(`📖 Swagger:       http://localhost:${PORT}/api/docs`);
});

export default app;
