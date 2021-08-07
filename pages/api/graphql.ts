import Cors from 'micro-cors';
import { makeGraphServer } from '@api/server';

// const production = process.env.NODE_ENV === 'production';
export const { server } = makeGraphServer({
  logError: console.log,
  // dbLogging: [
  //   'info',
  //   'warn',
  //   'error',
  //   ...(production ? [] : ['query' as 'query']),
  // ],
});

const handler = server.createHandler({ path: '/api/graphql' });

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
});

export default cors(handler);
