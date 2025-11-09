import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'defaultsecret',
    });
  }

  async validate(payload: any) {
    // 👇 Isso é o que vai cair em req.user
    return {
      sub: payload.sub, // ID do usuário
      email: payload.email,
      role: payload.role,
    };
  }
}
