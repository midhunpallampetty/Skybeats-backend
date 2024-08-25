import express from 'express';
import punycode from 'punycode';
import { ApolloServer } from 'apollo-server-express';
import connectDB from './common/config/connectDB';
import userTypeDefs from './graphql/typeDefs/userTypeDefs';
import userResolver from './graphql/resolvers/userResolvers';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import cors from 'cors';
import 'dotenv/config'
const startServer = async () => {
    const app: any = express();
    app.use(cors());

    await connectDB()
    const server = new ApolloServer({
        typeDefs,
        resolvers,

    })
    await server.start()
    server.applyMiddleware({ app })
    
    app.listen(process.env.PORT, () => {
        console.log('Server Started');

    })

}
startServer();