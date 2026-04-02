import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResumeDto } from './dto/create-resume.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ResumeEntity } from '../entities/resume.entity';

@Injectable()
export class ResumesService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly projectRepository: Repository<ProjectEntity>,
    @InjectRepository(ResumeEntity)
    private readonly resumeRepository: Repository<ResumeEntity>,
  ) {}

  async create(projectId: number, dto: CreateResumeDto) {
    const project = await this.projectRepository.findOne({ where: { id: projectId } });
    if (!project) throw new NotFoundException('Project not found');

    const resume = this.resumeRepository.create({
      projectId,
      ...dto,
    });
    return this.resumeRepository.save(resume);
  }

  async findByProjectId(projectId: number) {
    return this.resumeRepository.find({
      where: { projectId },
      order: { createdAt: 'DESC' },
    });
  }
}

