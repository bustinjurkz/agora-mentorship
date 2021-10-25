import Cors from 'micro-cors';
import { makeGraphServer } from '@api/server';

export const { server } = makeGraphServer({
  logError: console.log,
  isTest: false,
  dbLogging: ['info', 'warn', 'error', 'query'],
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS', 'GET'],
});

export default cors(handler);
