
// import { emailQueue } from "../src/queues/email.queue";
// import { EmailService } from "../src/services/email.service";
// import { EmailJobData, EmailJobType } from "../src/types/email";

import { emailQueue } from "../queues/email.queue";
import { EmailNodeService } from "../services/nodemailer.service";
import { EmailJobData, EmailJobType } from "../types/email";

// emailQueue.process(async (job) => {
//     const { to, payload, type } = job.data as EmailJobData;

//     try {
//         switch (type) {
//             case EmailJobType.WELCOME:
//                 await EmailService.sendWelcomeEmail(to, payload);
//                 break;
//             case EmailJobType.RESET_PASSWORD:
//                 console.log(type);
//                 await EmailService.sendResetPassword(to, payload);
//                 break;
//             case EmailJobType.CONFIRM_ORDER:
//                 await EmailService.sendOrderConfirmation(to, payload);
//                 break;
//             default:
//                 throw new Error(`Unknown email type: ${type}`);
//         }
//     } catch (err) {
//         console.error(`❌ Error processing email job [${type}]:`, err);
//         throw err;
//     }
// });


emailQueue.process(async (job) => {
    const { to, payload, type } = job.data as EmailJobData;

    try {
        switch (type) {
            case EmailJobType.WELCOME:
                await EmailNodeService.sendWelCome(to, payload);
                break;
            case EmailJobType.RESET_PASSWORD:
                console.log(type);
                await EmailNodeService.sendOTP(to, payload);
                break;
            case EmailJobType.CONFIRM_ORDER:
                await EmailNodeService.sendOrder(to, payload);
                break;
            default:
                throw new Error(`Unknown email type: ${type}`);
        }
    } catch (err) {
        console.error(`❌ Error processing email job [${type}]:`, err);
        throw err;
    }
});
