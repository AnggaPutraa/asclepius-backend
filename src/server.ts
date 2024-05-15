import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import { conf } from './conf';
import { errorMiddleware } from './common/middlewares';

import pingRoutes from './api/ping/ping.routes';
import predictRoutes from './api/predict/predict.routes';

const app = express();
const router = express.Router();

app.use(cors());
app.use(
  conf.env === 'dev'
    ? morgan('dev')
    : morgan(':method :url :status :res[content-length] - :response-time ms'),
);

router.use('/ping', pingRoutes);
router.use('/predict', predictRoutes);

app.use(router);
app.use(errorMiddleware);

app.listen(conf.port, () => {
  console.log(`Server is running on port ${conf.port}`);
});
