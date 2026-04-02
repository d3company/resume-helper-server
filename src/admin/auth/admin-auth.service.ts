import { Injectable, NotFoundException, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AdminEntity } from '../entities/admin.entity';
import { LoginAdminDto } from './dto/login-admin.dto';

@Injectable()
export class AdminAuthService implements OnModuleInit {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepository: Repository<AdminEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    // MVP 편의를 위해 서버 기동 시 "시드 관리자"를 자동 생성합니다.
    const bootstrapEmail = process.env.ADMIN_BOOTSTRAP_EMAIL;
    const bootstrapPassword = process.env.ADMIN_BOOTSTRAP_PASSWORD;
    if (!bootstrapEmail || !bootstrapPassword) return;

    const exists = await this.adminRepository.findOne({ where: { email: bootstrapEmail } });
    if (exists) return;

    const passwordHash = await bcrypt.hash(bootstrapPassword, 10);
    await this.adminRepository.save(
      this.adminRepository.create({
        email: bootstrapEmail,
        password: passwordHash,
      }),
    );
  }

  async login(dto: LoginAdminDto) {
    const admin = await this.adminRepository.findOne({ where: { email: dto.email } });
    if (!admin) throw new UnauthorizedException('Invalid credentials');

    const ok = await bcrypt.compare(dto.password, admin.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: admin.id, email: admin.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async findById(adminId: number) {
    const admin = await this.adminRepository.findOne({ where: { id: adminId } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }
}

