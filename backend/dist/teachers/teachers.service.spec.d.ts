import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTeacherDto): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            refreshToken: string | null;
        };
    } & {
        subject: string;
        hireDate: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(): Promise<({
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            refreshToken: string | null;
        };
    } & {
        subject: string;
        hireDate: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    })[]>;
    findByUserId(userId: number): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            refreshToken: string | null;
        };
    } & {
        subject: string;
        hireDate: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findById(id: number): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.UserRole;
            refreshToken: string | null;
        };
    } & {
        subject: string;
        hireDate: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    update(id: number, data: UpdateTeacherDto): Promise<{
        subject: string;
        hireDate: Date;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
