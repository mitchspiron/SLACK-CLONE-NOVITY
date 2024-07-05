import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  SignUpDto,
} from './dto';
import { GlobalResponseType } from '../../utils/type';
import { Public } from '../../shared/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  async signUpUser(@Body() dto: SignUpDto): GlobalResponseType {
    return await this.authService.signUpUser(dto);
  }

  @Public()
  @Post('login')
  login(@Body() dto: LoginDto): GlobalResponseType {
    return this.authService.login(dto);
  }

  @Public()
  @Get('/verify')
  @HttpCode(HttpStatus.OK)
  isLoggedIn(@Req() req, @Res() res): Promise<any> {
    return this.authService.isLoggedIn(req, res);
  }
}
