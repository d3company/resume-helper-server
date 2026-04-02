import { Body, Controller, Post } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { LoginAdminDto } from './dto/login-admin.dto';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly adminAuthService: AdminAuthService) {}

  @Post('login')
  async login(@Body() dto: LoginAdminDto) {
    return this.adminAuthService.login(dto);
  }
}

