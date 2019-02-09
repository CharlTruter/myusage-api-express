import { Router } from 'express';
import usage from './usage';

export default () => {
  const api = Router();

  api.use('/usage', usage());

  return api;
};
