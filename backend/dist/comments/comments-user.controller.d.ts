import { CommentsService } from './comments.service';
export declare class CommentsUserController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    findByUser(userId: number): Promise<{
        post: {
            content: string;
            id: number;
        };
        author: {
            id: number;
            email: string;
            name: string;
        };
        id: number;
        content: string;
        createdAt: Date;
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
            id: number;
            content: string;
            createdAt: Date;
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
