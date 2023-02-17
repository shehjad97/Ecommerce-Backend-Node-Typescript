import express from 'express';
import {
  testController
} from '../controllers/test.controller';

const router = express.Router();

router.route('/').get(testController);

export default router;
