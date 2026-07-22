import { Router } from 'express';

const healthRouter = Router();

healthRouter.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'FinApp API is running',
  });
});

export default healthRouter;
