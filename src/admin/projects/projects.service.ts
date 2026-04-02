import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { ProjectEntity } from '../entities/project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
  ) {}

  async create(dto: CreateProjectDto) {
    const project = this.projectRepository.create({
      ...dto,
      description: dto.description ?? null,
    });
    return this.projectRepository.save(project);
  }

  async findAll() {
    return this.projectRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }
}

