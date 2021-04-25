import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import chalk from "chalk";
import express from "express";
import { set, connect } from "mongoose";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import { TypegooseMiddleware } from "./utils/middleware/typegoose-middleware";
import { TypegooseEntityMiddleware } from "./utils/middleware/typegoose-entity-middleware";
import cookieParser from "cookie-parser";
import { refreshTokenHandler } from "./utils/refreshToken";
import cors from "cors";
import path from "path";

(async () => {
  // const whitelist = [
  //   "http://localhost:3000",
  //   "https://dashboard-haans.netlify.app/",
  // ];
  const PORT = process.env.PORT || 4040;
  const app = express();
  // app.use(
  //   cors({
  //     credentials: true,
  //     origin: whitelist[1],
  //   })
  // );
  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());

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

  set("returnOriginal", false);

  const schema = await buildSchema({
    resolvers,
    globalMiddlewares: [TypegooseMiddleware, TypegooseEntityMiddleware],
  });

  const server = new ApolloServer({
    schema,
    formatError: (e) => {
      return Error(e.message);
    },
    context: ({ req, res }) => ({ req, res }),
  });

  server.applyMiddleware({ app, cors: false });

  app.post("/refresh_token", refreshTokenHandler);

  if (process.env.NODE_ENV === "production") {
    app.use(express.static("public"));
    app.get("*", (_, res) => {
      res.sendFile(path.resolve(__dirname, "public", "index.html"));
    });
  }

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
