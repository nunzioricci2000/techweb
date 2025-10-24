const { config } = await import("dotenv");
console.debug("Loading environment variables");
config();
console.debug("Environment variables loaded:", process.env);

const { default: app } = await import("./app.js");

const PORT = process.env.PORT || 3000;
console.debug(`Starting server on port ${PORT}`);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

console.debug(`Server started on port ${PORT}`);
