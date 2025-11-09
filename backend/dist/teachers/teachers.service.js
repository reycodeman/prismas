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
exports.TeachersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let TeachersService = class TeachersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('E-mail já está em uso');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: 'TEACHER',
                teacher: {
                    create: {
                        subject: data.subject,
                        hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
                    },
                },
            },
            include: {
                teacher: true,
            },
        });
        return user;
    }
    async findAll() {
        return this.prisma.teacher.findMany({
            include: {
                user: { select: { id: true, name: true, email: true, role: true } },
            },
        });
    }
    async findById(id) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { id },
            include: {
                user: { select: { id: true, name: true, email: true, role: true } },
                students: true,
            },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Professor não encontrado');
        return teacher;
    }
    async findByUserId(userId) {
        const teacher = await this.prisma.teacher.findUnique({
            where: { userId },
            include: {
                user: { select: { id: true, name: true, email: true, role: true } },
                students: true,
            },
        });
        if (!teacher)
            throw new common_1.NotFoundException('Professor não encontrado');
        return teacher;
    }
    async update(id, data) {
        var _a;
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Professor não encontrado');
        return this.prisma.teacher.update({
            where: { id },
            data: {
                subject: (_a = data.subject) !== null && _a !== void 0 ? _a : undefined,
                hireDate: data.hireDate ? new Date(data.hireDate) : undefined,
            },
            include: { user: true },
        });
    }
    async remove(id) {
        const teacher = await this.prisma.teacher.findUnique({ where: { id } });
        if (!teacher)
            throw new common_1.NotFoundException('Professor não encontrado');
        await this.prisma.user.delete({ where: { id: teacher.userId } });
        return { message: 'Professor removido com sucesso' };
    }
};
exports.TeachersService = TeachersService;
exports.TeachersService = TeachersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeachersService);
//# sourceMappingURL=teachers.service.js.map