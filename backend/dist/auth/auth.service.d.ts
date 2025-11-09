import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    login(payload: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        access_token: string;
        refresh_token: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    }>;
    refreshToken(refresh_token: string): Promise<{
        message: string;
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
}
