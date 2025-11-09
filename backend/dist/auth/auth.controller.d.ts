import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: {
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
    refresh(body: {
        refresh_token: string;
    }): Promise<{
        message: string;
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<{
        message: string;
    }>;
}
