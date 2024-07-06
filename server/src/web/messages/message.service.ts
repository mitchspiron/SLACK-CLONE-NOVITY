import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
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

      if (!dto.recipientId && !dto.chatId && !dto.channelId) {
        throw new BadRequestException(
          `Recipient and Chat or Channel is required!`,
        );
      }

      let newMessage: Messages = null;
      if (dto.recipientId && dto.chatId && !dto.channelId) {
        const recipientExists = await this.prisma.users.findUnique({
          where: { id: dto.recipientId },
        });

        if (!recipientExists) {
          throw new BadRequestException(`Recipient does not exist!`);
        }

        const chatExists = await this.prisma.chats.findUnique({
          where: { id: dto.chatId },
        });

        if (!chatExists) {
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
            chatId: chatExists.id,
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
            chatId: chatExists.id,
          },
        });

        return ResponseMap(
          {
            message: newMessage,
          },
          'Message Added Successfully',
        );
      }

      if (!dto.recipientId && !dto.chatId && dto.channelId) {
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

  async getAllMessageByChatId(
    user: Users,
    dto: GetAllMessageByChatDto,
  ): GlobalResponseType {
    try {
      const userChat = await this.prisma.users_Chats.findFirst({
        where: {
          userId: user.id,
          chatId: dto.chatId,
        },
      });

      if (!userChat) {
        throw new UnauthorizedException('User not allowed to access this chat');
      }

      const chatExists = await this.prisma.messages.findMany({
        where: {
          chatId: userChat.chatId
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });

      if (chatExists.length == 0) {
        throw new BadRequestException('No message found!');
      }

      return ResponseMap(
        {
          messages: chatExists,
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
      const userChats = await this.prisma.users_Chats.findMany({
        where: {
          userId: user.id,
        },
        include: {
          chats: {
            include: {
              Messages: {
                take: 1,
                orderBy: {
                  createdAt: 'desc',
                },
              },
            },
          },
        },
      });

      if (userChats.length == 0) {
        throw new BadRequestException('No user chat found');
      }

      return ResponseMap(
        {
          chats: userChats,
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
}
