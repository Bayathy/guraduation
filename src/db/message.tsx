import { prisma } from "@/prisma";

export const createMessage = async (chatId: string, role: string, content: string) => {
  const message = await prisma.message.create({
    data: {
      chatId,
      role,
      content,
    },
  });
  return message;
};

export const getMessages = async (chatId: string) => {
  const messages = await prisma.message.findMany({
    where: { chatId },
  });
  return messages;
};

export const deleteMessages = async (chatId: string) => {
  await prisma.message.deleteMany({
    where: { chatId },
  });
};
