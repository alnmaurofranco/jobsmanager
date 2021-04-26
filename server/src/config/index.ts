import './env';

import auth from './auth';

const { NODE_PORT, NODE_URL } = process.env;

const port = NODE_PORT;
const baseUrl = NODE_URL;

export { port, baseUrl, auth };
