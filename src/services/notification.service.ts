import { toResponseNotificationDto } from "../automapper/notification.mapper";
import { QueryNotificationDto, ResponseNotificationDto } from "../dto/notification.dto";
import { Notification } from "../entity/Notification";
import { notificationRepo } from "../repositories/notification.repository";
import { TypeNotification } from "../utils/enum";
import { broadcast } from "../websocket/ws-server";

export const createNoti = async (noti: any): Promise<ResponseNotificationDto> => {
    
    const newNoti = await notificationRepo.save(noti);
    
    broadcast({
      type: noti.type,
      id: newNoti.id,
      message: newNoti.message,
      name: noti.name,
      avatar: noti.avatar,
      orderId: newNoti?.order?.id || "",
      contactId: newNoti?.contact?.id || "",
      isRead: newNoti.isRead,
    });
    return newNoti;
}

export const markAsRead = async (id: string): Promise<ResponseNotificationDto | null> => {
    const noti = await notificationRepo.findOneBy({ id });
    if (!noti) throw new Error("Không tìm thấy thông báo");
    noti.isRead = true;
    await notificationRepo.save(noti);
    return toResponseNotificationDto(noti);
};


export const readAll = async (): Promise<boolean> => {
  await notificationRepo
    .createQueryBuilder()
    .update(Notification)
    .set({ isRead: true })
    .execute();
  return true;
};

export const getUnread = async (query: QueryNotificationDto): Promise<ResponseNotificationDto[]> => {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;
    
    const where = {
        ...(query.type ? { type: query.type } : {}),
    };
    
    const [notifications] = await notificationRepo.findAndCount({
        where,
        relations: ['order', 'contact', 'order.customer'],
        order: {
            [query.sortBy || 'created_at']: query.order || 'desc',
        },
        take: limit,
        skip
    });
    return notifications.map(toResponseNotificationDto);
}

