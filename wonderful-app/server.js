import { Express } from "express";
import path from "path";
import assetsRouter from './server/assets-router'
const app = Express.express();
app.use("/src", assetsRouter);
app.use("/", Express.express.static(path.join(Express.__dirname, "public")));
app.get("/api/v1", (req, res) => {
  console.log("doing goooood")
  res.json({
    project: "React and Express Boilerplate",
    from: "Vanaldito",
  });
});
app.get("/*", (_req, res) => {
  res.sendFile(path.join(Express.__dirname, "public", "index.html"));
})
const { PORT = 5000 } = Express.process.env;
app.listen(PORT, () => {
  console.log();
  console.log(`  App running in port ${PORT}`);
  console.log();
  console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});