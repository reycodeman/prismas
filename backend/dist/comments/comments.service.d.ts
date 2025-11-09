import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(postId: number, userId: number, dto: CreateCommentDto): Promise<{
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
    findOne(commentId: number): Promise<{
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }>;
    update(commentId: number, userId: number, dto: CreateCommentDto): Promise<{
        content: string;
        createdAt: Date;
        id: number;
        authorId: number;
        postId: number;
    }>;
    remove(commentId: number, userId: number): Promise<{
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
    findAllByUser(userId: number): Promise<{
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
    findAll(query: any): Promise<{
        data: {
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
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
}
