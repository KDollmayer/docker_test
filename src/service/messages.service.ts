import { Prisma } from '@prisma/client';
import {
  createMessage,
  deleteSingleMessage,
  findManyMessagesByReciverPagination,
  findNewMessagesByReciver,
  updateReadStatusMessage,
} from '../repository/messages.repository';

export async function getNewMessagesByReciverService(userName?: string) {
  const messages = await findNewMessagesByReciver(userName);
  if (messages && messages.length > 0) {
    const messageIds = messages.map((message) => message.id);
    await updateReadStatusMessage(messageIds);
  }
  return messages;
}
export async function getMessagesByReciverPagination({
  startIndex,
  stopIndex,
  userName,
}: {
  userName?: string;
  startIndex: number;
  stopIndex: number;
}) {
  const messages = await findManyMessagesByReciverPagination({
    startIndex,
    stopIndex,
    userName,
  });
  const sortedByReadStatus = messages.filter(
    (message) => message.read === false
  );
  if (sortedByReadStatus && sortedByReadStatus.length > 0) {
    const messageIds = sortedByReadStatus.map((message) => message.id);
    await updateReadStatusMessage(messageIds);
  }
  return messages;
}

export async function createMessageService(message: Prisma.MessageCreateInput) {
  return await createMessage(message);
}
export async function deleteSingleMessageService(messageIds: string) {
  return await deleteSingleMessage(messageIds);
}
export async function deleteManyMessagesService(messageIds: string) {
  return await deleteSingleMessage(messageIds);
}
