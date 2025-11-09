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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentsService = class CommentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(postId, userId, dto) {
        const post = await this.prisma.post.findUnique({ where: { id: postId } });
        if (!post)
            throw new common_1.NotFoundException('Post não encontrado');
        return this.prisma.comment.create({
            data: { content: dto.content, authorId: userId, postId },
            include: { author: { select: { id: true, name: true, email: true } } },
        });
    }
    async findByPost(postId) {
        return this.prisma.comment.findMany({
            where: { postId },
            include: { author: { select: { id: true, name: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(commentId) {
        const comment = await this.prisma.comment.findUnique({ where: { id: commentId } });
        if (!comment)
            throw new common_1.NotFoundException('Comentário não encontrado');
        return comment;
    }
    async update(commentId, userId, dto) {
        await this.findOne(commentId);
        return this.prisma.comment.update({
            where: { id: commentId },
            data: { content: dto.content },
        });
    }
    async remove(commentId, userId) {
        await this.findOne(commentId);
        return this.prisma.comment.delete({ where: { id: commentId } });
    }
    async findByUserInPost(postId, userId) {
        return this.prisma.comment.findMany({
            where: { postId, authorId: userId },
            include: { author: { select: { id: true, name: true, email: true } } },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllByUser(userId) {
        const commentsList = await this.prisma.comment.findMany({
            where: { authorId: userId },
            include: {
                post: { select: { id: true, content: true } },
                author: { select: { id: true, name: true, email: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return commentsList.map(comment => {
            var _a;
            return ({
                ...comment,
                post: {
                    ...comment.post,
                    content: ((_a = comment.post) === null || _a === void 0 ? void 0 : _a.content.length) > 60
                        ? comment.post.content.slice(0, 60) + '...'
                        : comment.post.content,
                },
            });
        });
    }
    async findAll(query) {
        const { page = 1, limit = 10, postId, authorId, startDate, endDate, search, } = query;
        const skip = (page - 1) * limit;
        const filters = {};
        if (postId)
            filters.postId = Number(postId);
        if (authorId)
            filters.authorId = Number(authorId);
        if (startDate || endDate) {
            filters.createdAt = {};
            if (startDate)
                filters.createdAt.gte = new Date(startDate);
            if (endDate)
                filters.createdAt.lte = new Date(endDate);
        }
        if (search) {
            filters.content = { contains: search, mode: 'insensitive' };
        }
        const [comments, total] = await Promise.all([
            this.prisma.comment.findMany({
                where: filters,
                include: {
                    post: { select: { id: true, content: true } },
                    author: { select: { id: true, name: true, email: true } },
                },
                skip,
                take: Number(limit),
                orderBy: { createdAt: 'desc' },
            }),
            this.prisma.comment.count({ where: filters }),
        ]);
        const trimmed = comments.map(comment => {
            var _a;
            return ({
                ...comment,
                post: {
                    ...comment.post,
                    content: ((_a = comment.post) === null || _a === void 0 ? void 0 : _a.content.length) > 60
                        ? comment.post.content.slice(0, 60) + '...'
                        : comment.post.content,
                },
            });
        });
        return {
            data: trimmed,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};
exports.CommentsService = CommentsService;
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map