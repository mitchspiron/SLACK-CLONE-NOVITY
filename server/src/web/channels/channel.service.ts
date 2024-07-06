import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Users } from '@prisma/client';
import {
  AddUserInChannelDto,
  CreateChannelDto,
  DeleteChannelDto,
  EditChannelDto,
  GetAllChannelUsersByChannelDto,
  GetAllMessageByChannelDto,
  JoinChannelDto,
  LeaveChannelDto,
} from './dto';
import { GlobalResponseType, ResponseMap } from '../../utils/type';
import { CHANNEL_STATUS } from 'src/utils/enum';

@Injectable()
export class ChannelService {
  constructor(private prisma: PrismaService) {}

  async createChannel(user: Users, dto: CreateChannelDto): GlobalResponseType {
    try {
      const channel = await this.prisma.channels.create({
        data: {
          name: dto.name,
          userId: user.id,
          status: dto.status,
        },
      });

      await this.prisma.users_Channels.create({
        data: {
          userId: channel.userId,
          channelId: channel.id,
        },
      });

      return ResponseMap(
        {
          channel: channel,
        },
        'Channel Created Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async joinChannel(user: Users, dto: JoinChannelDto): GlobalResponseType {
    try {
      const channelExits = await this.prisma.channels.findUnique({
        where: {
          id: dto.channelId,
        },
      });

      if (!channelExits) {
        throw new BadRequestException('Channel to join does not exist!');
      }

      if (channelExits.status == CHANNEL_STATUS.PRIVATE) {
        throw new UnauthorizedException('Channel to join is private!');
      }

      const join = await this.prisma.users_Channels.create({
        data: {
          userId: user.id,
          channelId: channelExits.id,
        },
      });

      return ResponseMap(
        {
          user_channel: join,
        },
        'User Joined Channel Succesfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async addUserInChannel(
    user: Users,
    dto: AddUserInChannelDto,
  ): GlobalResponseType {
    try {
      const userChannelExists = await this.prisma.users_Channels.findFirst({
        where: {
          userId: user.id,
          channelId: dto.channelId,
        },
      });

      if (!userChannelExists) {
        throw new BadRequestException('You are not a member!');
      }

      const userChannel = await this.prisma.users_Channels.create({
        data: {
          userId: dto.userId,
          channelId: userChannelExists.channelId,
        },
      });

      return ResponseMap(
        {
          user_channel: userChannel,
        },
        'User Added Successfully In Channel',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async leaveChannel(user: Users, dto: LeaveChannelDto): GlobalResponseType {
    try {
      const userChannelExists = await this.prisma.users_Channels.findFirst({
        where: {
          userId: user.id,
          channelId: dto.channelId,
        },
      });

      if (!userChannelExists) {
        throw new BadRequestException('You are not a member!');
      }

      const userChannel = await this.prisma.users_Channels.delete({
        where: {
          id: userChannelExists.id,
        },
      });

      return ResponseMap(
        {
          user_channel: userChannel,
        },
        'Channel Left Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async editChannel(user: Users, dto: EditChannelDto): GlobalResponseType {
    try {
      const userChannelExists = await this.prisma.users_Channels.findFirst({
        where: {
          userId: user.id,
          channelId: dto.channelId,
        },
      });

      if (!userChannelExists) {
        throw new BadRequestException('You are not a member!');
      }

      if (userChannelExists.userId !== user.id) {
        throw new UnauthorizedException(
          'You are not allow to edit this channel!',
        );
      }

      const channel = await this.prisma.channels.update({
        where: {
          id: userChannelExists.channelId,
        },
        data: {
          name: dto.name,
          status: dto.status,
        },
      });

      return ResponseMap(
        {
          channel: channel,
        },
        'Channel Updated Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteChannel(user: Users, dto: DeleteChannelDto): GlobalResponseType {
    try {
      const channelExists = await this.prisma.channels.findFirst({
        where: {
          id: dto.channelId,
          userId: user.id,
        },
      });

      if (!channelExists) {
        throw new UnauthorizedException(
          'You are not allow to delete this channel!',
        );
      }

      await this.prisma.users_Channels.deleteMany({
        where: {
            channelId: channelExists.id
        }
      })

      const channel = await this.prisma.channels.delete({
        where: {
          id: channelExists.id,
        },
      });

      return ResponseMap(
        {
          channel: channel,
        },
        'Channel Deleted Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllChannel(user: Users): GlobalResponseType {
    try {
      const channels = await this.prisma.channels.findMany({
        where: {
          status: CHANNEL_STATUS.PUBLIC,
          NOT: {
            Users_Channels: {
              some: {
                userId: user.id,
              },
            },
          },
        },
      });

      if (channels.length == 0) {
        throw new NotFoundException('You are a member of all public channel');
      }

      return ResponseMap(
        {
          channels: channels,
        },
        'Channel Found Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllMessageByChannelId(
    user: Users,
    dto: GetAllMessageByChannelDto,
  ): GlobalResponseType {
    try {
      const userChannel = await this.prisma.users_Channels.findFirst({
        where: {
          userId: user.id,
          channelId: dto.channelId,
        },
      });

      if (!userChannel) {
        throw new UnauthorizedException('User not allowed to access this chat');
      }

      const channelExists = await this.prisma.messages.findMany({
        where: {
          channelId: userChannel.channelId,
        },
        orderBy: {
          updatedAt: 'asc',
        },
      });

      if (channelExists.length == 0) {
        throw new NotFoundException('No message found');
      }

      return ResponseMap(
        {
          messages: channelExists,
        },
        'Channel Messages Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllChannelUserByChannelId(
    dto: GetAllChannelUsersByChannelDto,
  ): GlobalResponseType {
    try {
      const userChannel = await this.prisma.channels.findMany({
        where: {
          id: dto.channelId,
        },
        include: {
          users: {
            select: {
              firstname: true,
              lastname: true,
              email: true,
            },
          },
        },
      });

      if (userChannel.length == 0) {
        throw new NotFoundException('No user found');
      }

      return ResponseMap(
        {
          channel_users: userChannel.map((obj) => obj.users),
        },
        'Channel Users Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllChannelUserByUserId(user: Users): GlobalResponseType {
    try {
      const userChannel = await this.prisma.users_Channels.findMany({
        where: {
          userId: user.id,
        },
        include: {
          channels: true,
        },
      });

      if (userChannel.length == 0) {
        throw new UnauthorizedException('User does not belon to a channel');
      }

      return ResponseMap(
        {
          user_channels: userChannel.map((obj) => obj.channels),
        },
        'Channel Users Fetched Successfully',
      );
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
