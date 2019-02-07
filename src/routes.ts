import { Application } from 'express';
import exampleRoutes from './examples/router';

export default function routes(app: Application): void {
  app.use('/api/v1/examples/', exampleRoutes);
}
