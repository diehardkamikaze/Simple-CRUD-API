import path from 'path';
import 'dotenv/config'

export const HOSTNAME = "127.0.0.1";

export const PORT = parseInt(process.env._SERVER_PORT || "8000");

export const ENDPOINT_BASE = /^\/api\/users$/;
export const ENDPOINT_USER = /^\/api\/users\/(.+)$/;

export const ERRORS = {
  portError: `No accept to post:${PORT}`,
  404: 'SORRY! BUT PAGE NOT FOUND!',
  badUUID: 'please use UUID as user id!',
  userNotFound: 'User with this UUID not found!',
  badData: 'sended data does not contain required field!',
};
