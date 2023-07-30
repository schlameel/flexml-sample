import * as dotenv from 'dotenv';
import express from 'express';
import setRoutes from './routes';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan('combined'));
app.set('port', process.env.PORT || 3000);
app.listen();
setRoutes(app);
app.listen(app.get('port'), () =>
  console.log(`FlexML Interview Project listening on port ${app.get('port')}`)
);

export {app};
