import crypto from "crypto";
import axios from "axios";
import { orderRepo } from "../repositories/order.repository";
import * as productVariantService from "./productVariant.service";
import * as orderService from "./order.service";
import { PaymentStatus } from "../utils/enum";
// import { emailQueue } from "../queues/email.queue";
import { EmailJobType } from "../types/email";

const momoConfig = {
    partnerCode: process.env.MOMO_PARTNER_CODE || "",
    accessKey: process.env.MOMO_ACCESS_KEY || "",
    secretKey: process.env.MOMO_SECRET_KEY || "",
    endpoint: process.env.MOMO_ENDPOINT || "",
    ipnUrl: process.env.MOMO_IPN_URL || "",
    returnUrl: process.env.MOMO_RETURN_URL || ""
}

export const MomoService = {
    async createPayment({total_amount, txnRef}: {total_amount: number, txnRef: string}) {

        const rawSignature = 
            `accessKey=${momoConfig.accessKey}` +
            `&amount=${total_amount}` +
            `&extraData=` +
            `&ipnUrl=${momoConfig.ipnUrl}` +
            `&orderId=${txnRef}` +
            `&orderInfo=Thanh toán Momo` +
            `&partnerCode=${momoConfig.partnerCode}` +
            `&redirectUrl=${momoConfig.returnUrl}/api/order/momo/return` +
            `&requestId=${txnRef}` +
            `&requestType=payWithMethod`;
        
        const signature = crypto.createHmac("sha256", momoConfig.secretKey)
            .update(Buffer.from(rawSignature, "utf-8"))
            .digest("hex");

        const body = {
            partnerCode: momoConfig.partnerCode,
            accessKey: momoConfig.accessKey,
            requestId: txnRef,
            amount: total_amount,
            orderId: txnRef,
            orderInfo: "Thanh toán Momo",
            redirectUrl: `${momoConfig.returnUrl}/api/order/momo/return`,
            ipnUrl: momoConfig.ipnUrl,
            extraData: "",
            requestType: "payWithMethod",
            signature: signature,
            lang: "vi",
        };
        try {
            const { data } = await axios.post(momoConfig.endpoint, body, { headers: { "Content-Type": "application/json" } });
            if(data.resultCode !== 0) throw new Error(data.message);
            return data.payUrl;
        } catch (err: any) {
            console.error("❌ MoMo createPayment error:", err.response?.data || err.message);
            throw err;
        } 
    },

    /** ✅ Xử lý IPN từ MoMo (POST) */
    async handleIpn(ipnData: any, res: any) {
        // ✅ Verify chữ ký
        if (!this.verifySignature(ipnData)) return res.status(400).json({ message: "Invalid signature" });
        const order = await orderService.getOrderByTxnRef(ipnData.orderId );
        if (order) {
            const isPaid = ipnData.resultCode == 0;
            order.payment_status = isPaid ? PaymentStatus.PAID : PaymentStatus.FAILED;
            await orderRepo.save(order);

            if (isPaid) {
                await Promise.all(
                    order.products.map(item =>
                        productVariantService.confirm(item.product_variant.id, item.quantity)
                    )
                )
                // emailQueue.add({ to: order.customer.email, payload: order, type: EmailJobType.CONFIRM_ORDER });
            }
        }

        return res.json({ message: "IPN OK" });
    },

    /** ✅ Xử lý Redirect từ MoMo (GET) */
    async handleReturn(orderId: string, res: any) {
        const order = await orderRepo.findOneBy({ txnRef: orderId });
        const success = order?.payment_status === PaymentStatus.PAID;
        return res.redirect(`${process.env.CLIENT_URL}/payment/result?status=${success ? "success" : "failed"}&txnRef=${orderId}`);
    },

    /** ✅ Verify chữ ký */
    verifySignature(ipnData: any) {
        const { signature, ...data } = ipnData;
        const raw = Object.keys(data).sort().map(k => `${k}=${data[k]}`).join("&");
        const sign = crypto.createHmac("sha256", momoConfig.secretKey).update(raw).digest("hex");
        return sign === signature;
    }
};