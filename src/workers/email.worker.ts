import { emailQueue } from "../queues/email.queue";
import { EmailService } from "../services/email.service";

emailQueue.process(async (job) => {
    const { to, order } = job.data;
    await EmailService.sendOrderConfirmation(to, order);
});