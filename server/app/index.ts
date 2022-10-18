import express from 'express';
import { PORT } from './config';
import { router as userRouter } from './user/route';
import { router as movieRouter } from './movie/route';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { notFoundMiddleware } from './middlewares/not-found';
import { authenticateUser } from './middlewares/authentication';

const app = express();

app.use(compression());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('[:date[web]] :method :url :status :response-time ms'));

export async function init() {
  try {
    initRouter();
    initServer();
  } catch (error) {
    console.error('unable to initialize app: ', error);
  }
}

async function initServer() {
  app.listen(PORT, () => {
    console.info(`server is running at https://localhost:${PORT}`);
  });
}

async function initRouter() {
  app.use('/healthCheck', (req, res) => {
    res.send('OK');
  });
  app.use('/user', userRouter);
  app.use('/movie', authenticateUser, movieRouter);
  app.use(notFoundMiddleware);
}

init();

export default app;
