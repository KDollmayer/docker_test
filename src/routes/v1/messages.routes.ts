import { Router } from 'express';
import {
  deleteManyMessages,
  deleteSingleMessage,
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
  validate(deleteSingleMessageParamSchema, 'params'),
  deleteSingleMessage
);
router.delete(
  '/',
  validate(deleteManyMessageBodySchema, 'body'),
  deleteManyMessages
);

export default router;
