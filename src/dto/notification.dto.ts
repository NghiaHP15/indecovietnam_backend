import { Notification } from "../entity/Notification";
import { TypeNotification } from "../utils/enum";

export interface ResponseNotificationDto {
    id: string;
    type: TypeNotification;
    message: string;
    orderId?: string;
    contactId?: string;
    isRead: boolean;
    created_at: Date;
}

export interface CreateNotificationDto {
    type: string;
    message: string;
    isRead: boolean;
    orderId?: string;
    contactId?: string;
}

export interface UpdateNotificationDto {
    type: string;
    message: string;
    isRead: boolean;
    orderId?: string;
    contactId?: string;
}

export interface QueryNotificationDto {
    page?: number;
    limit?: number;
    search?: string;
    type?: TypeNotification;
    sortBy?: keyof Notification;
    order?: 'asc' | 'desc';
}