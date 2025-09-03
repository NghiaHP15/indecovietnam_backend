import { Notification } from "../entity/Notification";
import { TypeNotification } from "../utils/enum";

export interface ResponseNotificationDto {
    id: string;
    type: TypeNotification;
    message: string;
    order: {
        id: string;
        tnxRef: string;
        customer: {
            id: string;
            email: string;
            firstname: string;
            lastname: string;
            avatar: string | undefined;
        }
    };
    contact: {
        id: string;
        email: string;
        name: string;
        avatar: string | undefined;
    }
    isRead: boolean;
    created_at: Date;
}

export interface CreateNotificationDto {
    type: string;
    message: string;
    isRead: boolean;
    order: {
        id: string;
    };
    contact: {
        id: string;
    };
}

export interface QueryNotificationDto {
    page?: number;
    limit?: number;
    search?: string;
    type?: TypeNotification;
    sortBy?: keyof Notification;
    order?: 'asc' | 'desc';
}