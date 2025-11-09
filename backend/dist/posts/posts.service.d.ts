import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: number, data: CreatePostDto): Promise<{
        author: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            refreshToken: string | null;
        };
        comments: {
            content: string;
            createdAt: Date;
            id: number;
            authorId: number;
            postId: number;
        }[];
        likes: {
            id: number;
            postId: number;
            userId: number;
        }[];
    } & {
        content: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        authorId: number;
    }>;
    findAll(): Promise<({
        author: {
            id: number;
            name: string;
            role: import(".prisma/client").$Enums.Role;
        };
        comments: {
            content: string;
            createdAt: Date;
            id: number;
            authorId: number;
            postId: number;
        }[];
        likes: {
            id: number;
            postId: number;
            userId: number;
        }[];
    } & {
        content: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        authorId: number;
    })[]>;
    findOne(id: number): Promise<{
        author: {
            id: number;
            name: string;
        };
        comments: {
            content: string;
            createdAt: Date;
            id: number;
            authorId: number;
            postId: number;
        }[];
        likes: {
            id: number;
            postId: number;
            userId: number;
        }[];
    } & {
        content: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        authorId: number;
    }>;
    update(id: number, data: UpdatePostDto): Promise<{
        author: {
            createdAt: Date;
            updatedAt: Date;
            id: number;
            email: string;
            password: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            refreshToken: string | null;
        };
        comments: {
            content: string;
            createdAt: Date;
            id: number;
            authorId: number;
            postId: number;
        }[];
        likes: {
            id: number;
            postId: number;
            userId: number;
        }[];
    } & {
        content: string;
        imageUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        authorId: number;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
