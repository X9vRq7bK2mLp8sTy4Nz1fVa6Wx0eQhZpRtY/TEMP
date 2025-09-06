import { tokens } from "./get-token";

export default function handler(req, res) {
  // read token from headers
  const token = req.headers["x-temp-token"];

  if (!token || !tokens[token] || tokens[token] < Date.now()) {
    res.setHeader("content-type", "text/plain");
    res.send('print("invalid or expired token 🚫")'); // lua-friendly
    return;
  }

  // single-use token
  delete tokens[token];

  res.setHeader("content-type", "text/plain");

  // lua-ready code
  res.send('print("hello roblox! this is raw lua code")');
}
