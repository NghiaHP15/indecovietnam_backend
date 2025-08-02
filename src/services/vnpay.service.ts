import { HashAlgorithm, ProductCode, VNPay, VNPayConfig, VnpLocale } from "vnpay";
import { orderRepo } from "../repositories/order.repository";
// import * as orderService from "./order.service";
import { PaymentStatus } from "../utils/enum";

// ✅ Cấu hình VNPay chuẩn (TypeScript an toàn)
const config: VNPayConfig = {
  tmnCode: process.env.VNP_TMNCODE || "",
  secureSecret: process.env.VNP_HASHSECRET || "",
  vnpayHost: "https://sandbox.vnpayment.vn",
  testMode: true,
  hashAlgorithm: HashAlgorithm.SHA512,   // ✅ lowercase để tránh lỗi TS2322
  enableLog: true,
};

const vnpay = new VNPay(config);

export const VNPayService = {
  /** ✅ Tạo URL thanh toán */
  async createPaymentUrl({ id, total_amount, ip, bankCode, txnRef }: {
    id: string;
    total_amount: number;
    ip: string;
    bankCode?: string;
    txnRef: string;
  }) {
    // const txnRef = id.replace(/-/g, "").substring(0, 20);
    // // 🔹 Lưu đơn hàng trước khi tạo URL
    // const dto = { id, total_amount, txnRef, ...order };
    // await orderService.createOrder(dto);

    // 🔹 Tạo URL với thư viện
    const url = await vnpay.buildPaymentUrl({
      vnp_Amount: total_amount, // Thư viện tự nhân 100
      vnp_IpAddr: ip,
      vnp_ReturnUrl: `${process.env.VNP_RETURN_URL}/api/payment/ipn?vnp=1`,
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: `Thanh toan don hang ${id}`,
      vnp_OrderType: ProductCode.Other,
      vnp_Locale: VnpLocale.VN,
      ...(bankCode ? { vnp_BankCode: bankCode } : {}),
    });

    console.log("🔗 VNPay Payment URL:", url);
    return url;
  },

  /** ✅ Xác minh kết quả redirect */
  async verifyPayment(query: any, res: any) {
    const result = vnpay.verifyReturnUrl(query);
    const txnRef = query.vnp_TxnRef;
    let success = false;

    if (result.isSuccess) {
      const order = await orderRepo.findOneBy({ txnRef });
      if (order) {
        order.payment_status =
          query.vnp_ResponseCode === "00" ? PaymentStatus.PAID : PaymentStatus.FAILED;
        await orderRepo.save(order);
        success = query.vnp_ResponseCode === "00";
      }
    }
    const redirectUrl = `${process.env.CLIENT_URL}/payment/result?status=${success ? "success" : "failed"}&txnRef=${txnRef}`;
    return res.redirect(redirectUrl);
  },
};
