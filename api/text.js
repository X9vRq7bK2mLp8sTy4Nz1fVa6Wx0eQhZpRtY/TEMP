import { tokens } from "./get-token";

export default function handler(req, res) {
  const token = req.headers["x-temp-token"];
  if (!token || !tokens[token] || tokens[token] < Date.now()) {
    res.status(403).send('print("invalid or expired token 🚫")'); // lua-friendly
    return;
  }

  // single-use token
  delete tokens[token];

  res.setHeader("content-type", "text/plain");

  // send lua-ready code as a string
  res.send('print("hello roblox! this is raw lua code")');
}
