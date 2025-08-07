import cron from 'node-cron';
import * as orderService from '../services/order.service';

cron.schedule("*/10 * * * *", async () => {
    try {
        await orderService.autoCancelOrders();
        console.log("Expired orders deleted successfully");
    } catch (error) {
        console.error("Error deleting expired orders:", error);
    }
});