import * as express from 'express';
import {Express, Router} from 'express';

import FlexMLCtrl from './controllers/flexml';

function setRoutes(app: Express): void {
  const router: Router = express.Router();
  const flexMLCtrl = new FlexMLCtrl();

  router.route('/flexml').get(flexMLCtrl.post);
  router.route('/flexml').post(flexMLCtrl.post);
  router.route('/flexml/joke').post(flexMLCtrl.joke);

  // Apply the routes to our application with the prefix /api
  app.use('/api', router);
}

export default setRoutes;
