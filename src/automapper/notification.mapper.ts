import { ResponseNotificationDto } from "../dto/notification.dto"
import { Notification } from "../entity/Notification"

export const toResponseNotificationDto = (noti: Notification): ResponseNotificationDto => {
    return {
        id: noti.id,
        type: noti.type,
        message: noti.message,
        isRead: noti.isRead,
        order: noti.order && {
            id: noti.order.id,
            tnxRef: noti.order.txnRef,
            customer: {
                id: noti.order.customer.id,
                email: noti.order.customer.email,
                firstname: noti.order.customer.firstname,
                lastname: noti.order.customer.lastname,
                avatar: noti.order.customer.avatar
            }
        },
        contact: noti.contact && {
            id: noti.contact.id,
            email: noti.contact.email,
            name: noti.contact.name,
            avatar: noti.contact.avatar
        },
        created_at: noti.created_at
    }
}