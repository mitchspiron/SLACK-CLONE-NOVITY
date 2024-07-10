import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GlobalResponseType } from '../../utils/type';
import { User } from '../../shared/decorators';
import { MessageService } from './message.service';
import {
  AddMessageDto,
  DeleteMessageDto,
  EditMessageDto,
  GetAllMessageByChatDto,
} from './dto';
import { Users as UserEntity } from '@prisma/client';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async createMessage(
    @User() user: UserEntity,
    @Body() dto: AddMessageDto,
  ): GlobalResponseType {
    return await this.messageService.createMessage(user, dto);
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  async editMessage(
    @User() user: UserEntity,
    @Body() dto: EditMessageDto,
  ): GlobalResponseType {
    return await this.messageService.editMessage(user, dto);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteMessageById(
    @User() user: UserEntity,
    @Body() dto: DeleteMessageDto,
  ): GlobalResponseType {
    return await this.messageService.deleteMessageById(user, dto);
  }

  @Post('chat/:id')
  @HttpCode(HttpStatus.OK)
  async getAllMessageByChatId(
    @User() user: UserEntity,
    @Param('id') chat: string,
  ): GlobalResponseType {
    return await this.messageService.getAllMessageByChatId(user, chat);
  }

  @Get('user-chat')
  @HttpCode(HttpStatus.OK)
  async getAllUserChatsByUserId(@User() user: UserEntity): GlobalResponseType {
    return await this.messageService.getAllUserChatsByUserId(user);
  }

  @Get('user-not-chat')
  @HttpCode(HttpStatus.OK)
  async getAllUsersNotChatedByUser(
    @User() user: UserEntity,
  ): GlobalResponseType {
    return await this.messageService.getAllUsersNotChatedByUser(user);
  }
}
