import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ResumeEntity } from './resume.entity';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  name!: string;

  @Column({ type: 'text', nullable: true })
  description!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => ResumeEntity, (resume) => resume.project)
  resumes!: ResumeEntity[];
}

