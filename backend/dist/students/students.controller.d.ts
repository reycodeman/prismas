import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
export declare class StudentsController {
    private readonly studentsService;
    constructor(studentsService: StudentsService);
    create(dto: CreateStudentDto): Promise<{
        student: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            userId: number;
            registrationNumber: string;
            course: string | null;
            teacherId: number | null;
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
            createdAt: Date;
            updatedAt: Date;
            id: number;
            name: string;
            email: string;
            password: string;
            role: import(".prisma/client").$Enums.Role;
            refreshToken: string | null;
        };
        teacher: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        registrationNumber: string;
        course: string | null;
        teacherId: number | null;
    })[]>;
    getMe(req: any): Promise<{
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
        teacher: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        registrationNumber: string;
        course: string | null;
        teacherId: number | null;
    }>;
    findById(id: number): Promise<{
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
        teacher: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        registrationNumber: string;
        course: string | null;
        teacherId: number | null;
    }>;
    update(id: number, dto: UpdateStudentDto): Promise<{
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
        teacher: {
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
        };
    } & {
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
        registrationNumber: string;
        course: string | null;
        teacherId: number | null;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
