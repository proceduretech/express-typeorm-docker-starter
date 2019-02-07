import Server from './config/server';
import routes from './routes';

export default new Server()
  .createDatabaseConnection()
  .router(routes)
  .listen(+process.env.PORT);
