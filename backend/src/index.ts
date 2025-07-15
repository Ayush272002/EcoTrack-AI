import express from "express";
import cors from "cors";
import { generateTextWithContext } from "./llmUtils";
import { FOOTPRINT_DETECTION } from "./prompt";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 8000;

app.post("/generate", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    console.log("Received prompt:", prompt);
    const ans = await generateTextWithContext(prompt, FOOTPRINT_DETECTION);
    const parsedResponse = JSON.parse(ans || "{}");
    return res.json({
      ans: parsedResponse.response,
    });
  } catch (error) {
    console.error("Error in /generate route:", error);
    return res.status(500).json({
      error: "Failed to generate response",
    });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on("SIGINT", () => {
  console.log("SIGINT received. Shutting down gracefully...");

  server.close(() => {
    console.log("Server closed");
    process.exit(0);
  });
});
