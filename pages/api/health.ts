import Cors from 'micro-cors';

const cors = Cors({
  allowMethods: ['GET'],
});

export default cors((_req, res) => {
  console.log('Health check - ok');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end('{}');
});
