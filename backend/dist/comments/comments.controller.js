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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentsController = void 0;
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_comment_dto_1 = require("./dto/create-comment.dto");
let CommentsController = class CommentsController {
    constructor(commentsService) {
        this.commentsService = commentsService;
    }
    async create(postId, dto, req) {
        const user = req.user;
        return this.commentsService.create(postId, user.sub, dto);
    }
    async findByPost(postId) {
        return this.commentsService.findByPost(postId);
    }
    async update(postId, commentId, dto, req) {
        const user = req.user;
        const comment = await this.commentsService.findOne(commentId);
        if (comment.authorId !== user.sub)
            throw new common_1.ForbiddenException('Você não pode editar este comentário.');
        return this.commentsService.update(commentId, user.sub, dto);
    }
    async remove(postId, commentId, req) {
        const user = req.user;
        const comment = await this.commentsService.findOne(commentId);
        if (comment.authorId !== user.sub)
            throw new common_1.ForbiddenException('Você não pode deletar este comentário.');
        return this.commentsService.remove(commentId, user.sub);
    }
    async findByUserInPost(postId, userId) {
        return this.commentsService.findByUserInPost(postId, userId);
    }
    findAllByUser(userId) {
        return this.commentsService.findAllByUser(+userId);
    }
};
exports.CommentsController = CommentsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findByPost", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':commentId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':commentId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentsController.prototype, "findByUserInPost", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CommentsController.prototype, "findAllByUser", null);
exports.CommentsController = CommentsController = __decorate([
    (0, common_1.Controller)('posts/:postId/comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentsService])
], CommentsController);
//# sourceMappingURL=comments.controller.js.map