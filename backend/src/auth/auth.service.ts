import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(payload: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
    if (!user) throw new UnauthorizedException('Usuário não encontrado');

    const isValid = await bcrypt.compare(payload.password, user.password);
    if (!isValid) throw new UnauthorizedException('Senha inválida');

    const access_token = this.jwtService.sign(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: '15m' },
    );

    const refresh_token = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });

    const hashedRt = await bcrypt.hash(refresh_token, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: hashedRt },
    });

    return {
      message: 'Login realizado com sucesso',
      access_token,
      refresh_token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role },
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const payload = this.jwtService.verify(refresh_token, {
        secret: process.env.JWT_SECRET || 'defaultsecret',
      });

      const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
      if (!user || !user.refreshToken) throw new UnauthorizedException('Token inválido');

      const valid = await bcrypt.compare(refresh_token, user.refreshToken);
      if (!valid) throw new UnauthorizedException('Token inválido');

      const newAccess = this.jwtService.sign(
        { sub: user.id, email: user.email, role: user.role },
        { expiresIn: '15m' },
      );

      const newRefresh = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });
      const hashedNewRt = await bcrypt.hash(newRefresh, 10);
      await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken: hashedNewRt } });

      return { message: 'Token renovado com sucesso', access_token: newAccess, refresh_token: newRefresh };
    } catch (err) {
      throw new UnauthorizedException('Refresh token inválido ou expirado');
    }
  }

  async logout(userId: number) {
    if (!userId) throw new BadRequestException('ID do usuário ausente');

    await this.prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
    return { message: 'Logout realizado com sucesso' };
  }
}
