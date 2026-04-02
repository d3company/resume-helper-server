import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from './project.entity';

@Entity('resumes')
export class ResumeEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'int' })
  projectId!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text' })
  summary!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => ProjectEntity, (project) => project.resumes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectId' })
  project!: ProjectEntity;
}

