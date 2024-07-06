import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { GlobalResponseType } from '../../utils/type';
import { User } from '../../shared/decorators';
import { Users as UserEntity } from '@prisma/client';
import { ChannelService } from './channel.service';
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

@Controller('channel')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createChannel(
    @User() user: UserEntity,
    @Body() dto: CreateChannelDto,
  ): GlobalResponseType {
    return await this.channelService.createChannel(user, dto);
  }

  @Post('join')
  @HttpCode(HttpStatus.OK)
  async joinChannel(
    @User() user: UserEntity,
    @Body() dto: JoinChannelDto,
  ): GlobalResponseType {
    return await this.channelService.joinChannel(user, dto);
  }

  @Post('add-user')
  @HttpCode(HttpStatus.OK)
  async addUserInChannel(
    @User() user: UserEntity,
    @Body() dto: AddUserInChannelDto,
  ): GlobalResponseType {
    return await this.channelService.addUserInChannel(user, dto);
  }

  @Delete('leave')
  @HttpCode(HttpStatus.OK)
  async leaveChannel(
    @User() user: UserEntity,
    @Body() dto: LeaveChannelDto,
  ): GlobalResponseType {
    return await this.channelService.leaveChannel(user, dto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async editChannel(
    @User() user: UserEntity,
    @Body() dto: EditChannelDto,
  ): GlobalResponseType {
    return await this.channelService.editChannel(user, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteChannel(
    @User() user: UserEntity,
    @Body() dto: DeleteChannelDto,
  ): GlobalResponseType {
    return await this.channelService.deleteChannel(user, dto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllChannel(@User() user: UserEntity): GlobalResponseType {
    return await this.channelService.getAllChannel(user);
  }

  @Get('message')
  @HttpCode(HttpStatus.OK)
  async getAllMessageByChannelId(
    @User() user: UserEntity,
    @Body() dto: GetAllMessageByChannelDto,
  ): GlobalResponseType {
    return await this.channelService.getAllMessageByChannelId(user, dto);
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  async getAllChannelUserByChannelId(
    @Body() dto: GetAllChannelUsersByChannelDto,
  ): GlobalResponseType {
    return await this.channelService.getAllChannelUserByChannelId(dto);
  }

  @Get('belong')
  @HttpCode(HttpStatus.OK)
  async getAllChannelUserByUserId(
    @User() user: UserEntity,
  ): GlobalResponseType {
    return await this.channelService.getAllChannelUserByUserId(user);
  }
}
