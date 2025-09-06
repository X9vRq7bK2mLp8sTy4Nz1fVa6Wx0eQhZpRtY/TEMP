let tokens = {}; // in-memory token store

function generateToken(length = 32) {
  return [...Array(length)].map(() =>
    Math.random().toString(36)[2]
  ).join("");
}

export default function handler(req, res) {
  const token = generateToken();
  const expiry = Date.now() + 30_000; // expires in 30 sec
  tokens[token] = expiry;

  // cleanup old tokens
  for (let t in tokens) {
    if (tokens[t] < Date.now()) delete tokens[t];
  }

  res.setHeader("content-type", "application/json");
  res.send(JSON.stringify({ token }));
}

export { tokens }; // allow text.js to access the same object
