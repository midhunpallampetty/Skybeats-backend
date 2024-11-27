import { AuthenticationError } from 'apollo-server';
import { verifyRefreshToken,verifyAccessToken } from '../../utils/tokenUtils';
import { TokenPayload } from '../../utils/tokenUtils';
interface ValidateTokenResponse {
  success: boolean;
  user: { userId: string };
}
const validateTokenResolver = {
  Query: {
    validateToken: (_: {}, args: { token: string }) => {
      console.log(args)
      const { token } = args;
      if (!token) {
        throw new AuthenticationError('Token missing');
      }

      const payload = verifyAccessToken(token);
      if (!payload) {
        throw new AuthenticationError('Invalid or expired token');
      }

      return { success: true, user: payload };
    },
  },
};

export default validateTokenResolver;
