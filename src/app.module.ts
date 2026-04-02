import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { DatabaseModule } from './database/database.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [DatabaseModule, AdminModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
