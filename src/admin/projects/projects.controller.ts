import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { AdminJwtAuthGuard } from '../auth/guards/admin-jwt-auth.guard';

@UseGuards(AdminJwtAuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return this.projectsService.create(dto);
  }

  @Get()
  async list() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async detail(@Param('id', ParseIntPipe) id: number) {
    return this.projectsService.findOne(id);
  }
}

