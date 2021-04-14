import chalk from "chalk";
import express from "express";

const app = express();
const PORT = process.env.PORT || 2001;
app.get("/", (_, res) => {
  res.status(200).send("Success add typescript");
});

app.listen(PORT, () => {
  console.log(chalk.magenta(`[server] Listening on http://localhost:${PORT}`));
});
