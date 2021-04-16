import { ApolloServer } from "apollo-server-express";
import chalk from "chalk";
import express from "express";
import { connect } from "mongoose";
import "dotenv/config";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import UserResolver from "./graphql/resolvers/UserResolver";

(async () => {
  const schema = await buildSchema({
    resolvers: [UserResolver],
  });
  const app = express();
  const PORT = process.env.PORT || 4040;
  const server = new ApolloServer({ schema });

  app.use(express.json());

  await connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
    .then(() => {
      console.log(chalk.blue("[database] Mongo is connected"));
    })
    .catch((e) => {
      console.log(chalk.bgRed("[database] Error: ", e));
    });

  app.get("/", (_, res) => {
    res.status(200).send("Yeay! Go to /graphql to have some fun!!");
  });

  server.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(
      chalk.magenta(
        `[server] Listening on http://localhost:${PORT + server.graphqlPath}`
      )
    );
  });
})().catch((e) => {
  console.log(chalk.bgGreenBright("[server] Error: ", e.message));
});
