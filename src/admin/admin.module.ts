import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from './entities/admin.entity';
import { ProjectEntity } from './entities/project.entity';
import { ResumeEntity } from './entities/resume.entity';
import { AdminAuthController } from './auth/admin-auth.controller';
import { AdminAuthService } from './auth/admin-auth.service';
import { ProjectsController } from './projects/projects.controller';
import { ProjectsService } from './projects/projects.service';
import { ResumesController } from './resumes/resumes.controller';
import { ResumesService } from './resumes/resumes.service';
import { AdminJwtStrategy } from './auth/strategies/admin-jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity, ProjectEntity, ResumeEntity]),
    JwtModule.register({
      secret: process.env.ADMIN_JWT_SECRET ?? 'dev-secret-change-me',
      signOptions: {
        expiresIn: process.env.ADMIN_JWT_EXPIRES_IN ?? '7d',
      },
    }),
  ],
  controllers: [AdminAuthController, ProjectsController, ResumesController],
  providers: [AdminAuthService, ProjectsService, ResumesService, AdminJwtStrategy],
})
export class AdminModule {}

