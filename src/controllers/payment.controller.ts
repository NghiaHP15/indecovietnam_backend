import { Request, Response } from "express";
import { VNPayService } from "../services/vnpay.service";
import { errorResponse, singleResponse } from "../utils/response";
import { PaymentMethod } from "../utils/enum";
import { generateUUID } from "../config/contant";
import { BankPayService } from "../services/bankpay.service";
import { MomoService } from "../services/momo.service";
import { getClientIp } from "../utils/crypto.hepler";
import { emailQueue } from "../queues/email.queue";
import * as orderService from "../services/order.service";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { paymentmethod: gateway, total_amount, bankCode } = req.body;
    // ✅ Tao ID don hang
    const id = generateUUID();
    // ✅ Lấy IP của client
    const ip = getClientIp(req)
    // ✅ Tạo ID thanh toán
    const txnRef = id.replace(/-/g, "").substring(0, 20);

    // 🔹 Lưu đơn hàng trước khi tạo URL
    const order = await orderService.createOrder({ id, total_amount, txnRef, ...req.body });
    const resultOrder = await orderService.getOrderById(id);
    let url: string;

    // ✅ Chọn cổng thanh toán
    switch (gateway) {
      case PaymentMethod.VNPAY:
        url = await VNPayService.createPaymentUrl({ id, total_amount, ip, bankCode, txnRef });
        break;
      case PaymentMethod.BANK:
        url = await BankPayService.createPayment({ id, total_amount, txnRef });
        break;
      case PaymentMethod.MOMO:
        url = await MomoService.createPayment({ id, total_amount, txnRef });
        break;
      default:
        res.status(400).json({ message: "Payment method not supported!" });
        return;
    }
    try {
      console.log("check");
      await emailQueue.add({ to: resultOrder?.customer.email, order: resultOrder });
    } catch (error) {
      console.error(error);
    }
    singleResponse(res, "Success", { paymentUrl: url });
  } catch (error) {
    errorResponse(res, error);
  }
};

export const ipnPayment = async (req: Request, res: Response): Promise<void> => {
  const { vnp, momo } = req.query;

  if (vnp) return VNPayService.verifyPayment(req.query, res);
  if (momo) return MomoService.handleIpn(req.body, res);

  res.status(400).json({ message: "Invalid payment gateway" });
};

export const momoReturn = (req: Request, res: Response) => {
  const { orderId } = req.query;
  return MomoService.handleReturn(orderId as string, res);
}