import "reflect-metadata";
import "dotenv/config";
import { ApolloError, ApolloServer } from "apollo-server-express";
import chalk from "chalk";
import express from "express";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { TypegooseMiddleware } from "./utils/middleware/typegoose-middleware";
import { TypegooseEntityMiddleware } from "./utils/middleware/typegoose-entity-middleware";
import { GraphQLError } from "graphql";

(async () => {
  const PORT = process.env.PORT || 4040;
  const app = express();
  app.use(express.json());
  await connect(process.env.MONGO_URI!, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
    .then(() => {
      console.log(chalk.yellow("[database] Mongo is connected"));
    })
    .catch((e) => {
      console.log(chalk.bgYellow("[database] Error: ", e.message));
    });

  const schema = await buildSchema({
    resolvers,
    globalMiddlewares: [TypegooseMiddleware, TypegooseEntityMiddleware],
  });

  const server = new ApolloServer({
    schema,
    /**
     * Error Formatter
     */
    formatError: (e: GraphQLError) => {
      if (e instanceof ApolloError) {
        console.log("you should see me");
      }
      return e;
    },
    context: ({ req, res }) => ({ req, res }),
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
  console.log(chalk.bgMagenta("[server] Error: ", e.message));
});
