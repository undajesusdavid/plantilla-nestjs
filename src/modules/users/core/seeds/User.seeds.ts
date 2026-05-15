import 'dotenv/config';

export const USERS = {
  USER_ROOT: {
    username: process.env.USER_ROOT_USERNAME ?? 'undajesusdavid',
    email: process.env.USER_ROOT_EMAIL ?? 'undajesusdavid@gmail.com',
    password: process.env.USER_ROOT_PASSWORD ?? '1573837',
    role: 'root',
    active: true,
  },
} as const;


