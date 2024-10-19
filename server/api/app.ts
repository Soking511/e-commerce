import { Server } from 'http';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import dbConnection from '../config/db';
import mountRoutes from '../Apps/index';
import { I18n } from 'i18n';
const app: express.Application = express()
dotenv.config()
app.use(cors({
  origin: ['http://localhost:4200', 'https://e-commerce-rose-five.vercel.app/'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token', 'X-API-KEY'],
  credentials: true
}))
app.use(cookieParser());
// app.use(csurf({
//   cookie: {
//     httpOnly: true,
//     secure: true,
//     sameSite: 'strict'
//   }
// }));
app.use(express.json({ limit: '2kb' }));
app.use(compression());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ['price', 'category', 'subcategory'] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }));
// app.use(express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});

// const i18n = new I18n({
//   locales: ['en', 'ar'],
//   directory: path.join(__dirname, 'locales'),
//   defaultLocale: 'en',
//   queryParameter: 'lang'
// })
// app.use(i18n.init);

dbConnection();
mountRoutes(app);
let server: Server;
server = app.listen(process.env.PORT || 3300, () => {
  console.log(`App is listen on port ${process.env.PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  console.error(`unhandledRejection Error : ${err.name} | ${err.message}`);
  server.close(() => {
    console.error('Application is shutting down...')
    process.exit(1);
  })
});
