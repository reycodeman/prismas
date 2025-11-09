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
exports.StudentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let StudentsService = class StudentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        var _a;
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: hashedPassword,
                role: 'STUDENT',
                student: {
                    create: {
                        registrationNumber: dto.registrationNumber,
                        course: (_a = dto.course) !== null && _a !== void 0 ? _a : '',
                        ...(dto.teacherId
                            ? { teacher: { connect: { id: dto.teacherId } } }
                            : {}),
                    },
                },
            },
            include: { student: true },
        });
        return user;
    }
    async findAll() {
        return this.prisma.student.findMany({
            include: { user: true, teacher: { include: { user: true } } },
        });
    }
    async findById(id) {
        const student = await this.prisma.student.findUnique({
            where: { id },
            include: { user: true, teacher: { include: { user: true } } },
        });
        if (!student)
            throw new common_1.NotFoundException('Aluno não encontrado');
        return student;
    }
    async findByUserId(userId) {
        const student = await this.prisma.student.findUnique({
            where: { userId },
            include: { user: true, teacher: { include: { user: true } } },
        });
        if (!student)
            throw new common_1.NotFoundException('Aluno não encontrado');
        return student;
    }
    async update(id, dto) {
        var _a;
        const student = await this.prisma.student.findUnique({ where: { id } });
        if (!student)
            throw new common_1.NotFoundException('Aluno não encontrado');
        return this.prisma.student.update({
            where: { id },
            data: {
                course: (_a = dto.course) !== null && _a !== void 0 ? _a : student.course,
                teacher: dto.teacherId
                    ? { connect: { id: dto.teacherId } }
                    : undefined,
            },
            include: { user: true, teacher: { include: { user: true } } },
        });
    }
    async remove(id) {
        const student = await this.prisma.student.findUnique({ where: { id } });
        if (!student)
            throw new common_1.NotFoundException('Aluno não encontrado');
        await this.prisma.user.delete({ where: { id: student.userId } });
        return { message: 'Aluno removido com sucesso' };
    }
};
exports.StudentsService = StudentsService;
exports.StudentsService = StudentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentsService);
//# sourceMappingURL=students.service.js.map