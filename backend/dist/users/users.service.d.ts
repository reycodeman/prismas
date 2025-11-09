import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    register(data: CreateUserDto): Promise<{
        message: string;
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
        };
    }>;
    findAll(): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findByEmail(email: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        refreshToken: string | null;
    }>;
    findById(id: number): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    logout(userId: number): Promise<{
        message: string;
    }>;
}
