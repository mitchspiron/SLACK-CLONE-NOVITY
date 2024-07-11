import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  AddMessageDto,
  DeleteMessageDto,
  EditMessageDto,
  GetAllMessageByChatDto,
} from './dto';
import { GlobalResponseType, ResponseMap } from '../../utils/type';
import { Messages, Users } from '@prisma/client';

@Injectable()
export class MessageService {
  constructor(private prisma: PrismaService) {}

  async createMessage(user: Users, dto: AddMessageDto): GlobalResponseType {
    try {
      const senderExists = await this.prisma.users.findUnique({
        where: { id: user.id },
      });

      if (!senderExists) {
        throw new BadRequestException(`Sender does not exist!`);
      }

      if (!dto.recipientId && !dto.channelId) {
        throw new BadRequestException(
          `Recipient and Chat or Channel is required!`,
        );
      }

      let newMessage: Messages = null;
      if (dto.recipientId && !dto.channelId) {
        const recipientExists = await this.prisma.users.findUnique({
          where: { id: dto.recipientId },
        });

        if (!recipientExists) {
          throw new BadRequestException(`Recipient does not exist!`);
        }

        const sharedChats = await this.prisma.users_Chats.findMany({
          where: {
            userId: user.id,
            chatId: {
              in: (
                await this.prisma.users_Chats.findMany({
                  where: {
                    userId: dto.recipientId,
                  },
                  select: {
                    chatId: true,
                  },
                })
              ).map((uc) => uc.chatId),
            },
          },
          select: {
            chatId: true,
          },
        });

        if (sharedChats.length == 0) {
          const newChat = await this.prisma.chats.create({
            data: {
              userId: user.id,
            },
          });

          await this.prisma.users_Chats.createMany({
            data: [
              {
                userId: user.id,
                chatId: newChat.id,
              },
              {
                userId: dto.recipientId,
                chatId: newChat.id,
              },
            ],
          });

          newMessage = await this.prisma.messages.create({
            data: {
              content: dto.content,
              senderId: user.id,
              recipientId: dto.recipientId,
              chatId: newChat.id,
            },
          });

          return ResponseMap(
            {
              message: newMessage,
            },
            'Message Added Successfully',
          );
        }

        const usersChat = await this.prisma.users_Chats.findMany({
          where: {
            chatId: sharedChats[0].chatId,
          },
          select: {
            userId: true,
          },
        });

        const users = usersChat.map((obj) => obj.userId);

        let sender = user.id;
        let recipient;

        if (sender === users[0]) {
          recipient = users[1];
        } else if (sender === users[1]) {
          recipient = users[0];
        }

        newMessage = await this.prisma.messages.create({
          data: {
            content: dto.content,
            senderId: sender,
            recipientId: recipient,
            chatId: sharedChats[0].chatId,
          },
        });

        return ResponseMap(
          {
            message: newMessage,
          },
          'Message Added Successfully',
        );
      }

      if (!dto.recipientId && dto.channelId) {
        const channelExists = await this.prisma.channels.findUnique({
          where: { id: dto.channelId },
        });

        if (!channelExists) {
          throw new BadRequestException(`This Channel does not exist!`);
        }

        const userChannelExists = await this.prisma.users_Channels.findFirst({
          where: {
            userId: user.id,
            channelId: channelExists.id,
          },
        });

        if (!userChannelExists) {
          throw new BadRequestException(
            `You are not a member of this channel!`,
          );
        }

        newMessage = await this.prisma.messages.create({
          data: {
            content: dto.content,
            senderId: userChannelExists.userId,
            channelId: userChannelExists.channelId,
          },
        });

        return ResponseMap(
          {
            message: newMessage,
          },
          'Message Added Successfully',
        );
      }
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editMessage(user: Users, dto: EditMessageDto): GlobalResponseType {
    try {
      const messageExists = await this.prisma.messages.findUnique({
        where: {
          id: dto.messageId,
          senderId: user.id,
        },
      });

      if (!messageExists) {
        throw new BadRequestException('No message found to update');
      }

      const updateMessage = await this.prisma.messages.update({
        where: {
          id: messageExists.id,
          senderId: messageExists.senderId,
        },
        data: {
          content: dto.content,
        },
      });

      return ResponseMap(
        {
          message: updateMessage,
        },
        'Message Updated Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteMessageById(
    user: Users,
    dto: DeleteMessageDto,
  ): GlobalResponseType {
    try {
      const messageExists = await this.prisma.messages.findUnique({
        where: {
          id: dto.messageId,
          senderId: user.id,
        },
      });

      if (!messageExists) {
        throw new BadRequestException('No message found to delete');
      }

      const deleteMessage = await this.prisma.messages.delete({
        where: {
          id: messageExists.id,
        },
      });

      return ResponseMap(
        {
          message: deleteMessage,
        },
        'Message Deleted Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllMessageByChatId(user: Users, chat: string): GlobalResponseType {
    try {
      const userChat = await this.prisma.users_Chats.findFirst({
        where: {
          userId: user.id,
          chatId: chat,
        },
      });

      if (!userChat) {
        throw new UnauthorizedException('User not allowed to access this chat');
      }

      const messages = await this.prisma.messages.findMany({
        where: {
          chatId: userChat.chatId,
        },
        orderBy: {
          updatedAt: 'asc',
        },
        select: {
          id: true,
          content: true,
          senderId: true,
          status: true,
          createdAt: true,
          recipient: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
            },
          },
        },
      });

      if (messages.length == 0) {
        throw new BadRequestException('No message found!');
      }

      const usersInChat = await this.prisma.users_Chats.findMany({
        where: {
          chatId: chat,
        },
        select: {
          users: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              status: true,
            },
          },
        },
      });

      // Récupérer les détails des expéditeurs (sender)
      const senderIds = [...new Set(messages.map((msg) => msg.senderId))]; // Obtenir les IDs uniques des expéditeurs
      const senders = await this.prisma.users.findMany({
        where: {
          id: {
            in: senderIds,
          },
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          status: true,
        },
      });

      const senderMap = senders.reduce((map, sender) => {
        map[sender.id] = {
          firstname: sender.firstname,
          lastname: sender.lastname,
        };
        return map;
      }, {});

      const chatExists = messages.map((message) => ({
        ...message,
        sender: {
          firstname: senderMap[message.senderId].firstname,
          lastname: senderMap[message.senderId].lastname,
        },
      }));
      return ResponseMap(
        {
          messages: chatExists,
          users_in_chat: usersInChat,
        },
        'Chat Messages Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUserChatsByUserId(user: Users): GlobalResponseType {
    try {
      const userMessages = await this.prisma.chats.findMany({
        where: {
          Users_Chats: {
            some: {
              userId: user.id,
            },
          },
        },
        include: {
          Messages: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 1,
            include: {
              recipient: true,
            },
          },
          Users_Chats: {
            include: {
              users: true,
            },
          },
        },
      });

      if (userMessages.length == 0) {
        throw new BadRequestException('No user chat found');
      }

      userMessages.sort((a, b) => {
        const dateA: any = a.Messages[0]?.createdAt;
        const dateB: any = b.Messages[0]?.createdAt;
        return dateB - dateA; // Trier par ordre décroissant
      });

      const results = userMessages.map((chat) => {
        const lastMessage = chat.Messages[0];
        const otherUser = chat.Users_Chats.find(
          (uc) => uc.userId !== user.id,
        ).users;

        return {
          chatId: chat.id,
          lastMessageContent: lastMessage?.content,
          lastMessageCreatedAt: lastMessage?.createdAt,
          lastMessageSenderId: lastMessage?.senderId,
          otherUserFirstName: otherUser.firstname,
          otherUserLastName: otherUser.lastname,
          otherUserStatus: otherUser.status,
        };
      });

      return ResponseMap(
        {
          chats: results,
        },
        'User Chats Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllUsersNotChatedByUser(user: Users): GlobalResponseType {
    try {
      const myChats = await this.prisma.users_Chats.findMany({
        where: {
          userId: user.id,
        },
        select: {
          chatId: true,
        },
      });

      const myChatIds = myChats.map((chat) => chat.chatId);

      const usersWithoutMyChats = await this.prisma.users.findMany({
        where: {
          id: {
            not: user.id,
          },
          AND: {
            Users_Chats: {
              none: {
                chatId: {
                  in: myChatIds,
                },
              },
            },
          },
        },
      });

      if (usersWithoutMyChats.length == 0) {
        throw new NotFoundException('You are chating with all users');
      }

      return ResponseMap(
        {
          chats: usersWithoutMyChats,
        },
        'Users Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
