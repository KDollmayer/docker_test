import { Prisma } from '@prisma/client';
import { HttpError } from '../middleware/errorHandler';
import db from '../utils/db';

export async function findNewMessagesByReciver(userName?: string) {
  const whereCondition = userName
    ? {
        reciver: {
          mode: 'insensitive' as Prisma.QueryMode,
          equals: userName,
        },
        deleted: false,
        read: false,
      }
    : { deleted: false, read: false };
  try {
    return await db.message.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error getting all messages');
    }
  }
}
export async function findManyMessagesByReciverPagination({
  startIndex,
  stopIndex,
  userName,
}: {
  userName?: string;
  startIndex: number;
  stopIndex: number;
}) {
  const whereCondition = userName
    ? {
        reciver: {
          mode: 'insensitive' as Prisma.QueryMode,
          contains: userName,
        },
        deleted: false,
      }
    : { deleted: false };

  try {
    return await db.message.findMany({
      where: whereCondition,
      orderBy: { createdAt: 'desc' },
      skip: startIndex,
      take: stopIndex - startIndex,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error getting all messages');
    }
  }
}
export async function createMessage(message: Prisma.MessageCreateInput) {
  try {
    return await db.message.create({ data: message });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error creating message');
    }
  }
}
export async function deleteSingleMessage(messageId: string) {
  try {
    const updatedMessage = await db.message.update({
      where: { id: messageId },
      data: { deleted: true },
    });
    return { success: updatedMessage.id, failed: '' };
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === 'P2025'
    ) {
      console.warn(`Message with ID ${messageId} not found.`);
      return { failed: messageId, success: '' };
    } else if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error deleting the message');
    }
  }
}

interface FailedDeletes {
  id: string;
  reason: string;
}
export async function deleteManyMessage(messageIds: string[]) {
  const updatedIds: string[] = [];
  const failedIds: FailedDeletes[] = [];
  try {
    for (const id of messageIds) {
      try {
        await db.message.update({
          where: { id: id },
          data: {
            deleted: true,
          },
        });
        updatedIds.push(id);
      } catch (error) {
        failedIds.push({ id: id, reason: 'Not Found' });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error deleting many messages');
    }
  }
  return { updatedIds, failedIds };
}
export async function updateReadStatusMessage(messageIds: string[]) {
  try {
    return await db.message.updateMany({
      where: { id: { in: messageIds } },
      data: {
        read: true,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new HttpError(500, error.message);
    } else {
      throw new HttpError(500, 'Error deleting many messages');
    }
  }
}
