import { attachControllers } from '@decorators/express';
import { Router } from 'express';
import FileController from './entity/image/image.controller';

const router = Router();

attachControllers(router, [FileController]);

export default router;
