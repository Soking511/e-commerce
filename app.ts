import { Server } from 'http';
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import compression from 'compression';
import mongoSanitize from 'express-mongo-sanitize';
import hpp from 'hpp';
import helmet from 'helmet';
import cors from 'cors';
import dbConnection from './config/db';
import mountRoutes from "./Apps/index";
import { I18n } from 'i18n';
const app: express.Application = express()
app.use(express.json({ limit: '2kb' }));
app.use(cors({
  origin: ['http://localhost:4200', 'https://dramcode.top'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))
app.use(express.static('uploads'))
dotenv.config()
app.use(compression());
app.use(mongoSanitize());
app.use(hpp({ whitelist: ['price', 'category', 'subcategory'] }));
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-origin' } }));
const i18n = new I18n({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang'
})
app.use(i18n.init)
dbConnection()
mountRoutes(app)

const port = process.env.PORT;
let server:Server = app.listen(port);

process.on( 'unhandledRejection', (err:Error) => {
  console.error( `unhandledRejection: ${err.name} | ${err.message}` )
  server.close(() => {
    console.error('shutting the server down');
    process.exit(1);
  })
})