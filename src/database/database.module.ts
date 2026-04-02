import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // MVP: 프로세스가 올라갈 때마다 같은 파일 DB를 사용합니다.
      // 필요 시 POSTGRESQL/MySQL 등으로 교체할 수 있습니다.
      database: join(process.cwd(), process.env.SQLITE_PATH ?? 'resume-helper.sqlite'),
      autoLoadEntities: true,
      synchronize: true, // MVP 단계에서는 편하게 스키마 동기화
      logging: false,
    }),
  ],
})
export class DatabaseModule {}

