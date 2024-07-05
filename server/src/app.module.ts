import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './prisma/prisma.module';
import { AtGuard } from './shared/guards';
import { AuthModule } from './web/auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppService,
  ],
})
export class AppModule {}
