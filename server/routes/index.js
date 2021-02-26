import agentsRouter from './agents';
import logsRouter from './logs';

const apiPrefix = '/api/v1';

const routes = [
  agentsRouter,
  logsRouter,
];

export default (app) => {
  routes.forEach((route) => app.use(apiPrefix, route));
  return app;
};
