// src/services/mailService.ts
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY as string,
});

const sentFrom = new Sender(process.env.MAILERSEND_EMAIL as string, "Indeco VietNam");
export const EmailService = {
    async sendOrderConfirmation(to: string, order: any) {
        
        const recipients = [new Recipient(to, order.customer.firstname)];

        const personalization = [
            {
                email: to,
                data: {
                    txnRef: order.txnRef,
                    address: order.address,
                    customer_: order.customer.firstname + ' ' + order.customer.lastname,
                    order_date: new Date(order.order_date).toLocaleDateString("vi-VN"),
                    total_amount: order.total_amount,
                    customer_name: order.customer.firstname + ' ' + order.customer.lastname,
                    products: order.products.map((item: any) => {
                        return {
                            url: item.product_variant.image,
                            title: item.name,
                            price: item.total_price,
                            quantity: item.quantity,
                            description: `Mã sản phẩm ${item.product_variant.sku} x ${item.quantity}`,
                        }
                    })
                    
                },
            },
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject("Xác nhận đơn hàng")
            .setTemplateId(process.env.MAILERSEND_TEMPLATE_ORDER_ID as string)
            .setPersonalization(personalization);
        
        try {
            console.log("📧 Sending email to:", to);
            await mailerSend.email.send(emailParams);
            console.log(`✅ Email xác nhận đã gửi tới ${to}`);
        } catch (err: any) {
            console.error("❌ SendGrid error:", err || err.message);
        }
    }
}