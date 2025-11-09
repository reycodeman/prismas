"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async login(payload) {
        const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
        if (!user)
            throw new common_1.UnauthorizedException('Usuário não encontrado');
        const isValid = await bcrypt.compare(payload.password, user.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Senha inválida');
        const access_token = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
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
    async refreshToken(refresh_token) {
        try {
            const payload = this.jwtService.verify(refresh_token, {
                secret: process.env.JWT_SECRET || 'defaultsecret',
            });
            const user = await this.prisma.user.findUnique({ where: { id: payload.sub } });
            if (!user || !user.refreshToken)
                throw new common_1.UnauthorizedException('Token inválido');
            const valid = await bcrypt.compare(refresh_token, user.refreshToken);
            if (!valid)
                throw new common_1.UnauthorizedException('Token inválido');
            const newAccess = this.jwtService.sign({ sub: user.id, email: user.email, role: user.role }, { expiresIn: '15m' });
            const newRefresh = this.jwtService.sign({ sub: user.id }, { expiresIn: '7d' });
            const hashedNewRt = await bcrypt.hash(newRefresh, 10);
            await this.prisma.user.update({ where: { id: user.id }, data: { refreshToken: hashedNewRt } });
            return { message: 'Token renovado com sucesso', access_token: newAccess, refresh_token: newRefresh };
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Refresh token inválido ou expirado');
        }
    }
    async logout(userId) {
        if (!userId)
            throw new common_1.BadRequestException('ID do usuário ausente');
        await this.prisma.user.update({ where: { id: userId }, data: { refreshToken: null } });
        return { message: 'Logout realizado com sucesso' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map