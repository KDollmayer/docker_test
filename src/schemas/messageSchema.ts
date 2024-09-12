import Joi from 'joi';

export const postMessageSchema = Joi.object({
  sender: Joi.string().min(3).required(),
  reciver: Joi.string().min(1).required(),
  content: Joi.string().min(1).required(),
});
export const querySchema = Joi.object({
  username: Joi.string().min(1),
});
export const deleteSingleMessageParamSchema = Joi.object({
  messageId: Joi.string().min(1).required(),
});
export const deleteManyMessageBodySchema = Joi.object({
  messageIds: Joi.array().items(Joi.string()).min(1).required(),
});
export const getAllMessagesQuerySchema = Joi.object({
  username: Joi.string().min(1),
  startIndex: Joi.number().min(0).default(0).required(),
  stopIndex: Joi.number().min(0).default(10).required(),
});
