// // src/services/mailService.ts
// import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

// const mailerSend = new MailerSend({
//   apiKey: process.env.MAILERSEND_API_KEY as string,
// });

// const sentFrom = new Sender(process.env.MAILERSEND_EMAIL as string, "Indeco VietNam");

// async function sendEmail(to: string, name: string, subject: string, templateId: string, data: any) {
//     const recipients = [new Recipient(to, name)];
//     const personalization = [{email: to, data}];

//     const emailParams = new EmailParams()
//         .setFrom(sentFrom)
//         .setTo(recipients)
//         .setReplyTo(sentFrom)
//         .setSubject(subject)
//         .setTemplateId(templateId)
//         .setPersonalization(personalization);

//     try {
//         console.log("📧 Sending email to:", to);
//         await mailerSend.email.send(emailParams);
//         console.log(`✅ Email xác nhận đã gửi tới ${to}`);
//     } catch (err: any) {
//         console.error("❌ Sending error:", err || err.message);
//     }
// }

// export const EmailService = {
//     async sendOrderConfirmation(to: string, order: any) {

//         const data = {
//             txnRef: order.txnRef,
//             address: order.address,
//             customer_: order.customer.firstname + ' ' + order.customer.lastname,
//             order_date: new Date(order.order_date).toLocaleDateString("vi-VN"),
//             total_amount: order.total_amount,
//             customer_name: order.customer.firstname + ' ' + order.customer.lastname,
//             products: order.products.map((item: any) => {
//                 return {
//                     url: item.product_variant.image,
//                     title: item.name,
//                     price: item.total_price,
//                     quantity: item.quantity,
//                     description: `Mã sản phẩm ${item.product_variant.sku} x ${item.quantity}`,
//                 }
//             })
//         }

//         return sendEmail(
//             to, 
//             order.customer.firstname + ' ' + order.customer.lastname, 
//             "Xác nhận đơn hàng", 
//             process.env.MAILERSEND_TEMPLATE_ORDER_ID as string, 
//             data
//         );
//     },

//     async sendWelcomeEmail(to: string, customer: any) {
//         return sendEmail(
//             to, 
//             customer.firstname + ' ' + customer.lastname, 
//             "Xin chào!", 
//             process.env.MAILERSEND_TEMPLATE_WELCOME_ID as string, 
//             { name: customer.firstname + ' ' + customer.lastname }
//         );
//     },

//     async sendResetPassword(to: string, data: any) {
//         return sendEmail(
//             to, 
//             "Quý khách", 
//             "Mã OTP đặt lại mật khẩu", 
//             process.env.MAILERSEND_TEMPLATE_RESET_PASSWORD_ID as string, 
//             { email: data.email, otp: data.otp }
//         );
//     }
// }