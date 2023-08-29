import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UrlsModule } from './urls/urls.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, UrlsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
