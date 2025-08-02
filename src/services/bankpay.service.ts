// import * as orderService from "./order.service";

export const BankPayService = {
  createPayment: async ({ id, total_amount, txnRef }: { id: string, total_amount: number, txnRef: string }) => {
    // const txnRef = id.replace(/-/g, "").substring(0, 20);
    // const dto = { id, total_amount, txnRef, ...order };
    // const result = await orderService.createOrder(dto);
    // const success = !!result;
    // ✅ Chỉ trả về URL
    return `${process.env.CLIENT_URL}/payment/result?status=success&txnRef=${txnRef}`;
  },
};