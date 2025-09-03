import { ResponseNotificationDto } from "../dto/notification.dto"
import { Notification } from "../entity/Notification"

export const toResponseNotificationDto = (noti: Notification): ResponseNotificationDto => {
    return {
        id: noti.id,
        type: noti.type,
        message: noti.message,
        isRead: noti.isRead,
        orderId: noti.orderId,
        contactId: noti.contactId,
        created_at: noti.created_at
    }
}