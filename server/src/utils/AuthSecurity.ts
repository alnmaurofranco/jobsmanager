import { sign, SignOptions, verify } from 'jsonwebtoken';
import { auth } from '@config/index';

type signJWT = SignOptions;

const signOptions = {
  algorithm: 'RS256',
  expiresIn: auth.jwt.duration,
} as signJWT;

const generateToken = (payload: string) =>
  sign({}, auth.jwt.privateKey, {
    ...signOptions,
    subject: payload,
  });

const verifyToken = (token: string) => verify(token, auth.jwt.publicKey);

const generateEmailToken = (payload: string) =>
  sign({}, auth.jwt.privateKey, {
    algorithm: 'RS256',
    expiresIn: '24h',
    subject: payload,
  });

const verifyEmailToken = (reqToken: string) =>
  verify(reqToken, auth.jwt.publicKey);

export { generateToken, verifyToken, generateEmailToken, verifyEmailToken };
