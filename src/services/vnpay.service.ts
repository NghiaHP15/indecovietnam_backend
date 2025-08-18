import { HashAlgorithm, ProductCode, VNPay, VNPayConfig, VnpLocale } from "vnpay";
import { orderRepo } from "../repositories/order.repository";
import * as productVariantService from "./productVariant.service";
import { PaymentStatus } from "../utils/enum";
import { getOrderByTxnRef } from "./order.service";
// import { emailQueue } from "../queues/email.queue";
import { EmailJobType } from "../types/email";

// ✅ Cấu hình VNPay chuẩn (TypeScript an toàn)
const config: VNPayConfig = {
  tmnCode: process.env.VNP_TMNCODE || "",
  secureSecret: process.env.VNP_HASHSECRET || "",
  vnpayHost: process.env.VNP_HOST || "",
  testMode: true,
  hashAlgorithm: HashAlgorithm.SHA512,   // ✅ lowercase để tránh lỗi TS2322
  enableLog: true,
};

const vnpay = new VNPay(config);

export const VNPayService = {
  /** ✅ Tạo URL thanh toán */
  async createPaymentUrl({ total_amount, ip, bankCode, txnRef }: {
    total_amount: number;
    ip: string;
    bankCode?: string;
    txnRef: string;
  }) {

    // 🔹 Tạo URL với thư viện
    const url = await vnpay.buildPaymentUrl({
      vnp_Amount: total_amount, // Thư viện tự nhân 100
      vnp_IpAddr: ip,
      vnp_ReturnUrl: `${process.env.VNP_RETURN_URL}/api/order/payment/ipn?vnp=1`,
      vnp_TxnRef: txnRef,
      vnp_OrderInfo: `Thanh toan don hang ${txnRef}`,
      vnp_OrderType: ProductCode.Other,
      vnp_Locale: VnpLocale.VN,
      ...(bankCode ? { vnp_BankCode: bankCode } : {}),
    });

    console.log("🔗 VNPay Payment URL:", url);
    return url;
  },

  /** ✅ Xác minh kết quả redirect */
  async verifyPayment(query: any, res: any) {
    const { isSuccess } = vnpay.verifyReturnUrl(query);
    const txnRef = query.vnp_TxnRef;
    let status: 'success' | 'failed' = 'failed';

    if (isSuccess && txnRef) {
      const order = await getOrderByTxnRef(txnRef);
      
      if (order) {
        const isPaid = query.vnp_ResponseCode === '00';
        
        order.payment_status = isPaid ? PaymentStatus.PAID : PaymentStatus.FAILED;
        await orderRepo.save(order);

        if (isPaid) {
          await Promise.all(
            order.products.map(item =>
              productVariantService.confirm(item.product_variant.id, item.quantity)
            )
          );
          // emailQueue.add({ to: order.customer.email, payload: order, type: EmailJobType.CONFIRM_ORDER });
          status = 'success';
        }
      }
    }

    return res.redirect(`${process.env.CLIENT_URL}/payment/result?status=${status}&txnRef=${txnRef}`);
  },
};
