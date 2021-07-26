import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import chalk from "chalk";
import express from "express";
import { set, connect } from "mongoose";
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers";
import cookieParser from "cookie-parser";
import {
  TypegooseMiddleware,
  TypegooseEntityMiddleware,
  refreshTokenHandler,
} from "./utils";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

(async () => {
  const isDev = process.env.NODE_ENV !== "production";
  const PORT = process.env.PORT || 4040;
  try {
    const app = express();
    app.use(
      helmet({
        contentSecurityPolicy: isDev ? false : undefined,
      }),
    );
    app.use(morgan(":method :url :response-time ms :status - :date[web]"));
    app.use(
      cors({
        credentials: true,
        origin: isDev
          ? "http://localhost:3000"
          : "https://dashboard-haans.netlify.app",
      }),
    );
    app.use(express.json());
    app.use(cookieParser());

    await connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }).then(() => {
      console.log(chalk.yellow("[database] Mongo is connected"));
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
    await server.start();
    server.applyMiddleware({
      app,
      // cors: false,
    });

    app.post("/refresh_token", refreshTokenHandler);

    app.listen(PORT, () => {
      console.log(
        chalk.magenta(
          `[server] Listening on http://localhost:${PORT + server.graphqlPath}`,
        ),
      );
    });
  } catch (error) {
    console.log(chalk.bgMagenta("[server] Error: ", error.message));
  }
})();
