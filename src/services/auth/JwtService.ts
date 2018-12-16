import jwt from 'jsonwebtoken';
require('dotenv').config();

export default class JwtService {
  static generateToken(id: string, issuer: string) {
    return jwt.sign(
      {
        id: id,
        exp: Math.floor(Date.now() / 1000) + 3600 * 24 * parseInt(process.env.TOKEN_DAYS),
        issuer: issuer,
      },
      process.env.SECRET_JWT
    );
  }

  static decode(token: string) {
    return jwt.verify(token, process.env.SECRET_JWT);
  }
}
