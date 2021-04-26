import { createConnection } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
createConnection().then((_) => {
  // eslint-disable-next-line no-console
  console.log('Database started 📦');
});
