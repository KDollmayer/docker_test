import { NextFunction, Request, Response } from 'express';
import {
  createMessageService,
  deleteManyMessagesService,
  deleteSingleMessageService,
  getMessagesByReciverPagination,
  getNewMessagesByReciverService,
} from '../service/messages.service';
import { Prisma } from '@prisma/client';

export async function getNewMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.query as {
    username: string | undefined;
  };
  try {
    const messages = await getNewMessagesByReciverService(username);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}
export async function getAllMessagesByReciver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, startIndex, stopIndex } = req.query as {
      username: string | undefined;
      startIndex: string;
      stopIndex: string;
    };

    const messages = await getMessagesByReciverPagination({
      startIndex: Number(startIndex),
      stopIndex: Number(stopIndex),
      userName: username,
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
}
export async function submitMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const message: Prisma.MessageCreateInput = req.body;
  try {
    const messages = await createMessageService(message);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}
export async function deleteSingleMessage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { messageId } = req.params;
  try {
    const messages = await deleteSingleMessageService(messageId);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}
export async function deleteManyMessages(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { messageIds } = req.body;
  try {
    const messages = await deleteManyMessagesService(messageIds);
    res.json(messages);
  } catch (error) {
    next(error);
  }
}
