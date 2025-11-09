import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔑 Login
  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;
    const user = { email, password };
    return this.authService.login(user);
  }

  // ♻️ Refresh token
  @Post('refresh')
  async refresh(@Body() body: { refresh_token: string }) {
    return this.authService.refreshToken(body.refresh_token);
  }

  // 🚪 Logout protegido por JWT
  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Request() req) {
    const userId = req.user.sub; // ID do usuário vem do token JWT
    return this.authService.logout(userId);
  }
}
