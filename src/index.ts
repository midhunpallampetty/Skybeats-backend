// src/index.ts
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './common/config/connectDB';
import { createServer } from 'http';
import cors from 'cors';
import 'dotenv/config';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { configureSocket } from './utils/socket';
import morgan from 'morgan';
const startServer = async () => {
  const app: any = express();
  const httpServer = createServer(app);

  
  app.use(cors());
  app.use(morgan('dev'));
  
  configureSocket(httpServer);

  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};

startServer();
