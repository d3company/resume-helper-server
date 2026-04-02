import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { AdminJwtAuthGuard } from '../auth/guards/admin-jwt-auth.guard';

@UseGuards(AdminJwtAuthGuard)
@Controller('projects/:projectId/resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  async create(
    @Param('projectId', ParseIntPipe) projectId: number,
    @Body() dto: CreateResumeDto,
  ) {
    return this.resumesService.create(projectId, dto);
  }

  @Get()
  async list(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.resumesService.findByProjectId(projectId);
  }
}

