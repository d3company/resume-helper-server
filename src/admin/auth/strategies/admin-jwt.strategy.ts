import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export type AdminJwtPayload = {
  sub: number;
  email: string;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ADMIN_JWT_SECRET ?? 'dev-secret-change-me',
    });
  }

  async validate(payload: AdminJwtPayload) {
    // guard에서 req.user로 들어갈 값
    return { adminId: payload.sub, email: payload.email };
  }
}

