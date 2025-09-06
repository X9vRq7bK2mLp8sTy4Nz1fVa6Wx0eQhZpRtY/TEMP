export default function handler(req, res) {
  // generate a temporary token automatically
  const token = [...Array(32)].map(() =>
    Math.random().toString(36)[2]
  ).join("");

  // token expires in 30 seconds (for logging purposes)
  const expiry = Date.now() + 30_000;

  // lua code to run, including the token in a comment for debugging
  const luaCode = `-- token: ${token} (expires in 30s)
print("hello roblox! this is raw lua code")`;

  res.setHeader("content-type", "text/plain");
  res.send(luaCode);
}
