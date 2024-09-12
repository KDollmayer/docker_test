import { Router, Request, Response } from 'express';
import {
  getAllMessagesByReciver,
  getNewMessages,
  submitMessage,
} from '../../controller/messages.controller';
import { validate } from '../../middleware/validateRequest';
import {
  deleteManyMessageBodySchema,
  deleteSingleMessageParamSchema,
  querySchema,
  postMessageSchema,
  getAllMessagesQuerySchema,
} from '../../schemas/messageSchema';

const router = Router();
router.get('/new', validate(querySchema, 'query'), getNewMessages);
router.get(
  '/',
  validate(getAllMessagesQuerySchema, 'query'),
  getAllMessagesByReciver
);
router.post('/', validate(postMessageSchema, 'body'), submitMessage);
router.delete(
  '/:messageId',
  validate(deleteSingleMessageParamSchema, 'params')
);
router.delete('/', validate(deleteManyMessageBodySchema, 'body'));

export default router;
