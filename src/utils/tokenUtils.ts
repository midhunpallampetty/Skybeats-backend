import jwt,{JwtPayload} from 'jsonwebtoken';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'your-access-token-secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

export interface TokenPayload {
  userId: string;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  console.log("Generating Access Token for Payload:", payload);
  const token = jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: '1m' });
  console.log("Generated Access Token:", token);
  return token;
};


export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
};

export const verifyRefreshToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET) as JwtPayload & TokenPayload;
    return decoded;
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      console.error('Refresh token has expired');
    } else {
      console.error('Invalid refresh token');
    }
    return null; // Return null for any verification failure
  }
};
export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as JwtPayload & TokenPayload;
    return decoded;
  } catch (error:any) {
    if (error.name === 'TokenExpiredError') {
      console.error('access token has expired');
    } else {
      console.error('Invalid access token');
    }
    return null; // Return null for any verification failure
  }
};
