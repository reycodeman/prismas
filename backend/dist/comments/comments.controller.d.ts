import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Request } from 'express';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: number, dto: CreateCommentDto, req: Request): Promise<{
        author: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }>;
    findByPost(postId: number): Promise<({
        author: {
            id: number;
            name: string;
        };
    } & {
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    })[]>;
    update(postId: number, commentId: number, dto: CreateCommentDto, req: Request): Promise<{
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }>;
    remove(postId: number, commentId: number, req: Request): Promise<{
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }>;
    findByUserInPost(postId: number, userId: number): Promise<({
        author: {
            id: number;
            email: string;
            name: string;
        };
    } & {
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    })[]>;
    findAllByUser(userId: string): Promise<{
        post: {
            content: string;
            id: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
        };
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }[]>;
}
