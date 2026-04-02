import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('admins')
@Unique(['email'])
export class AdminEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'text' })
  email!: string;

  // password에는 평문이 아닌 해시값(bcrypt)을 저장합니다.
  @Column({ type: 'text' })
  password!: string;

  @CreateDateColumn()
  createdAt!: Date;
}

