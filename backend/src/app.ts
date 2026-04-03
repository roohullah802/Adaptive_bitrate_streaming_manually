import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app: Application = express();

app.use(express.static("uploads"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const _filename = fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);
  const filePath = path.resolve(_dirname, "utils", "index.html");
  console.log(filePath);

  res.sendFile(filePath, (err) => {
    console.log("error ==> ", err);
  });
});

app.get("/video/:filename", (req: Request, res: Response) => {
  const { filename } = req.params;
  if (!filename) {
    return res.status(400).send("Filename is required");
  }
  const filenme = Array.isArray(filename) ? filename[0] : filename;

  const _filename = fileURLToPath(import.meta.url);
  const _dirname = path.dirname(_filename);

  const filePath = path.resolve(_dirname, "..", "uploads", "hls", filenme!);
  console.log(filePath);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error("Error serving file:", err);
      res.status(404).send("File not found");
    }
  });
});

export default app;
