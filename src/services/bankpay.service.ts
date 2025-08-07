import { orderRepo } from "../repositories/order.repository";
import { PaymentStatus } from "../utils/enum";
import { getOrderByTxnRef } from "./order.service";

export const BankPayService = {
  createPayment: async ({ txnRef }: { txnRef: string }) => {
    const order = await getOrderByTxnRef(txnRef);
    
    if (order) {
      order.payment_status = PaymentStatus.AWAITTING_CONFIRMATION;
      await orderRepo.save(order);
    }
    
    return `${process.env.CLIENT_URL}/payment/result?status=success&txnRef=${txnRef}`;
  },
};