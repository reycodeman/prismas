import { PrismaService } from '../prisma/prisma.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: CreateTeacherDto): Promise<{
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
    findById(id: number): Promise<{
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
    findByUserId(userId: number): Promise<{
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
    update(id: number, data: UpdateTeacherDto): Promise<{
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
