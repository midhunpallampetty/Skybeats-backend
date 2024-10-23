// resolvers.js
import { googleAuthModel } from "../../models/googleAuth";// Import your model

const getGoogleResolver = {
  Query: {
    async getTokenByEmail(_:{}, { email }: { email: string }) {
      try {
        // Find the document by email
        const googleAuth = await googleAuthModel.findOne({ email });

        if (!googleAuth) {
          throw new Error('Email not found or token expired');
        }

        return googleAuth;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch token');
      }
    },
  },
};

export default getGoogleResolver;
                                            