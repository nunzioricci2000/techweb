const { config } = await import("dotenv");
config();

const { default: App } = await import("./app.js");

const app = App();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
