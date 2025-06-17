import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
const API_KEY = "rJ7XaUF0IQZG7UYu0jp85Mdqpeu5MnbP";
app.get("/api/nyt/archive/:y/:m", async (req, res) => {
  const { y, m } = req.params;
  const url = `https://api.nytimes.com/svc/archive/v1/${y}/${m}.json?api-key=${API_KEY}`;
  const ny = await fetch(url);
  res.setHeader("Content-Type", "application/json");
  ny.body.pipe(res);
});

app.listen(3001, () => console.log("proxy on :3001"));
