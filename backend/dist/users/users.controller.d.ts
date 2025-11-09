import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    register(body: CreateUserDto): Promise<{
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
    getProfile(req: Request): Promise<{
        createdAt: Date;
        id: number;
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
