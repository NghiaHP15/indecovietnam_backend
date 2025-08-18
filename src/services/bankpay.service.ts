// import { emailQueue } from "../queues/email.queue";
import { orderRepo } from "../repositories/order.repository";
import { EmailJobType } from "../types/email";
import { PaymentStatus } from "../utils/enum";
import { getOrderByTxnRef } from "./order.service";

export const BankPayService = {
  createPayment: async ({ txnRef }: { txnRef: string }) => {
    const order = await getOrderByTxnRef(txnRef);
    
    if (order) {
      order.payment_status = PaymentStatus.AWAITTING_CONFIRMATION;
      await orderRepo.save(order);
      // emailQueue.add({ to: order.customer.email, payload: order, type: EmailJobType.CONFIRM_ORDER });
    }
    
    return `${process.env.CLIENT_URL}/payment/result?status=success&txnRef=${txnRef}`;
  },
};