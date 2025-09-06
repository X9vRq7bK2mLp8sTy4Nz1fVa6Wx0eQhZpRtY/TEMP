import { tokens } from "./get-token";

export default function handler(req, res) {
  const token = req.headers["x-temp-token"];
  if (!token || !tokens[token] || tokens[token] < Date.now()) {
    res.status(403).send("invalid or expired token 🚫");
    return;
  }

  // optional: make token single-use
  delete tokens[token];

  res.setHeader("content-type", "text/plain");
  res.send("hello roblox! this is raw text.");
}
