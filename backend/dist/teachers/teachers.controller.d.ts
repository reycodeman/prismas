import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Request } from 'express';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(dto: CreateTeacherDto): Promise<{
        teacher: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            bio: string | null;
            subject: string | null;
            hireDate: Date | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        refreshToken: string | null;
    }>;
    findAll(): Promise<({
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        bio: string | null;
        subject: string | null;
        hireDate: Date | null;
    })[]>;
    me(req: Request): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
        students: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            registrationNumber: string;
            course: string | null;
            teacherId: number | null;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        bio: string | null;
        subject: string | null;
        hireDate: Date | null;
    }>;
    findOne(id: number, req: Request): Promise<{
        user: {
            id: number;
            name: string;
            email: string;
            role: import(".prisma/client").$Enums.Role;
        };
        students: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            registrationNumber: string;
            course: string | null;
            teacherId: number | null;
        }[];
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        bio: string | null;
        subject: string | null;
        hireDate: Date | null;
    }>;
    update(id: number, dto: UpdateTeacherDto): Promise<{
        user: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            refreshToken: string | null;
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        bio: string | null;
        subject: string | null;
        hireDate: Date | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
