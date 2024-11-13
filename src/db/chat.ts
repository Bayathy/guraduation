import { prisma } from "@/prisma";

export const createChat = async (userId: string) => {
  const chat = await prisma.chat.create({
    data: {
      name: "New Chat",
      userId,
    },
  });

  return chat;
};

export const getChats = async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: { userId },
  });
  return chats;
};


export const getChat = async (chatId: string) => {
  const chat = await prisma.chat.findUnique({
    where: { id: chatId },
  });
  return chat;
};

export const deleteChat = async (chatId: string) => {
  await prisma.chat.delete({
    where: { id: chatId },
  });
};
