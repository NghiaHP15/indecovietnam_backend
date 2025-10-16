import nodemailer from "nodemailer";
import { formatCurrency } from "../utils/fomat.hepler";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "indecoinfor@gmail.com", // Gmail của bạn
    pass: "aauqyxaxerapmgfv"    // Mật khẩu ứng dụng 16 ký tự
  }
});


export const EmailNodeService = {
    async sendOTP ( to: string, data: any ) {
        const mailOptions = {
            from: '"Indeco Vietnam" indecoinfor@gmail.com',
            to: to,
            subject: "Mã xác thực OTP",
            text: `Mã OTP của bạn là: ${data.otp}`,
            html: ` <div style="font-family: 'Roboto Condensed', sans-serif;">
                    <div>
                        <div style="margin-bottom: 20px;">
                            <h1 style="font-size: 30px;"><strong><span style="color: rgb(81, 53, 30);">INDECO</span></strong> <strong><span style="color: rgb(197, 150, 114);">VIETNAM</span></strong></h1>
                        </div>
                        <div>
                            <p>Xin chào ${data.user.firstname},</p>
                            <p>Mã OTP của bạn là: <b>${data.otp}</b></p>
                            <p>Mã này sẽ hết hạn trong 5 phút.</p>
                        </div>
                    </div>
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                    </div>`
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email đã gửi:", info.response);
        } catch (error) {
            console.error("Lỗi gửi email:", error);
        }
    },
    async sendWelCome( to: string, data: any) {
        const mailOptions = {
            from: '"Indeco Vietnam" indecoinfor@gmail.com',
            to: to,
            subject: "Xin chào mừng quý khách đến với Indeco Vietnam",
            text: `Xin chào ${data.user.firstname + ' ' + data.user.lastname}, chào mừng bạn đến với Indeco Vietnam!`,
            html: `<div style="font-family: 'Roboto Condensed', sans-serif; background-color: #f5f6fa; padding: 30px;">
                    <div style="max-width: 600px; background-color: #ffffff; padding: 30px; margin: 0 auto; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
                        <div style="text-align: center; margin-bottom: 10px;">
                            <h1 style="text-align: center; font-size: 28px;"><strong><span style="color: rgb(81, 53, 30);">INDECO</span></strong> <strong><span style="color: rgb(197, 150, 114);">VIETNAM</span></strong></h1>
                        </div>
                        <div style="text-align: center; margin-bottom: 10px;">
                            <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760514318/indecovietnam/welcome_s6pfyj.png" alt="Indeco Vietnam Logo" style="max-width: 350px; margin-bottom: 20px;">
                        </div>
                        <div style="padding: 0 30px; margin-bottom: 10px; text-align: center;">
                            <h2 style="text-align: center; color: #444;">Welcome, ${data.user.firstname + ' ' + data.user.lastname}</h2>
                            <h3 style="text-align: center; color: #444;">Chào mừng quý khách đến với Indeco VietNam.</h3>
                            <p style="font-size: 15px; color: #555;">
                                Chào mừng quý khách đã kích hoạt tài khoản thành công. Lần tiếp theo hãy đăng nhập để mua hàng thuận tiện hơn.
                            </p>
                            <p style="color: #444;">Xem thêm để hiểu biết thêm về chúng tôi</p>
                        </div>
                        <div style="text-align: center;">
                            <a href="https://www.facebook.com/profile.php?id=61576607768367&locale=vi_VN" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515620/indecovietnam/facebook_jbvypq.png" alt="Facebook" width="32" height="32" />
                            </a>
                            <a href="https://www.instagram.com/indeco.vietnam/" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515620/indecovietnam/instagram_nyrkvu.png" alt="Instagram" width="32" height="32" />
                            </a>
                            <a href="https://indecovietnam.com/" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515537/indecovietnam/web_1_jtfyte.png" alt="Website" width="32" height="32" />
                            </a>
                            <a href="https://www.tiktok.com/@indeco_vietnam?lang=vi-VN" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515538/indecovietnam/tiktok_djdapp.png" alt="TikTok" width="32" height="32"  />
                            </a>
                        </div>
                    </div>
                    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                </div>`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email đã gửi:", info.response);
        } catch (error) {
            console.error("Lỗi gửi email:", error);
        }
    },
    async sendOrder(to: string, order: any) {
        const mailOptions = {
            from: '"Indeco Vietnam" indecoinfor@gmail.com',
            to: to,
            subject: "Xác nhận đơn hàng tại Indeco Vietnam",
            text: `Xác nhận đơn hàng Kính gửi khách hàng ${order.customer.fisrtname + ' ' + order.customer.lastname}, Cảm ơn quý khách hàng đã đặt hàng tại INDECO. Đơn hàng của quý khách đã được tiếp nhận và đang trong quá trình xử lý. Mã đơn hàng của quý khách là ${order.txnRef}. Xin vui lòng giữ mã đơn hàng để tiện theo dõi trạng thái đơn hàng.`,
            html: `<div style="font-family: 'Roboto Condensed', sans-serif; background-color: #fff; color: #333; margin: 0; padding: 0;">
                    <div style="max-width:650px;margin:0 auto;background:#fff;padding:30px;border:1px solid #eee;">
                        <div style="text-align: center; margin-bottom: 5px;">
                        <h1 style="text-align: center; font-size: 28px;"><strong><span style="color: rgb(81, 53, 30);">INDECO</span></strong> <strong><span style="color: rgb(197, 150, 114);">VIETNAM</span></strong></h1>
                        </div>
                        <h3 style="margin:5px 0 10px; color: #555">Đơn hàng ${order.txnRef}</h3>
                        <p style="font-weight:bold; color: #555">Cảm ơn quý khách hàng đã đặt hàng tại INDECO</p>
                        <p style="color: #555">
                        Xin chào ${order.customer.firstname + ' ' + order.customer.lastname}, INDECO đã nhận được đơn hàng của quý khách hàng và đã sẵn sàng để vận chuyển. 
                        Quý khách hàng không thể hủy đơn hàng sau 24 tiếng kể từ khi đơn hàng được INDECO xác nhận thành công.
                        </p>
                        <a href="${process.env.CLIENT_URL}/order?=txnRef=${order.txnRef}" style="display:inline-block;background:#b48456;color:#fff;text-decoration:none;padding:10px 20px;border-radius:4px;font-weight:bold;margin-top:15px;">Xem đơn hàng</a>
                        <h3 style="color: #555; border-bottom:1px solid #ddd;margin-top:20px;padding-bottom:10px;">Thông tin đơn hàng</h3>
                        ${order.products.map((item: any) => {
                            return `
                            <div style="display:flex;margin:10px 0;">
                                <div style="display:flex; width: 84%;">
                                    <img src="${item.product_variant.image}" alt="Product Image" style="width:80px;height:80px;object-fit:cover;border:1px solid #eee;border-radius:4px;margin-right:10px;" />
                                    <div>
                                        <div style="font-weight:bold; color: #555">${item.name}</div>
                                        <div style="color:#555;">Mã sản phẩm ${item.product_variant.sku} x ${item.quantity}</div>
                                    </div>
                                </div>
                                <div style="text-align: end;width: 15%;"><strong style="color: #555">${formatCurrency(item.total_price)}</strong></div>
                            </div>`
                        })}

                        <table style="width:100%;border-collapse:collapse;">
                        <tr>
                            <td style="padding:4px 0;font-size:14px; color: #555">Tổng giá trị sản phẩm</td>
                            <td style="padding:4px 0;font-size:14px;text-align:right; color: #555">${formatCurrency(order.total_amount)}</td>
                        </tr>
                        <tr>
                            <td style="padding:4px 0;font-size:14px; color: #555">Khuyến mãi</td>
                            <td style="padding:4px 0;font-size:14px;text-align:right; color: #555">0đ</td>
                        </tr>
                        <tr>
                            <td style="padding:4px 0;font-size:14px; color: #555">Chi phí vận chuyển</td>
                            <td style="padding:4px 0;font-size:14px;text-align:right; color: #555">0đ</td>
                        </tr>
                        <tr>
                            <td style="padding-top:10px;border-top:1px solid #ddd;font-weight:bold; color: #555">Tổng cộng</td>
                            <td style="padding-top:10px;border-top:1px solid #ddd;font-weight:bold;text-align:right; color: #555">${order.total_amount}</td>
                        </tr>
                        </table>

                        <div style="font-size:14px;">
                            <div style="margin-top:10px;">
                                <strong style="color: #555;">Thông tin khách hàng</strong><br />
                                <p>Tên khách hàng: ${order.customer.firstname + ' ' + order.customer.lastname}</p>
                                <p>Ngày đặt hàng: ${new Date(order.order_date).toLocaleDateString("vi-VN")}</p>
                                <p>Địa chỉ: ${order.address.address_line || ""} - ${order.address.ward || ""} - ${order.address.district || ""} - ${order.address.city || ""}
                            </div></p>
                            <div style="margin-top:10px;">
                                <strong>Phương thức vận chuyển</strong><br />
                                <p>Miễn phí giao hàng & lắp đặt tại Hà Nội đối với các sản phẩm nội thất. Các sản phẩm thuộc danh mục Đồ Trang Trí, phí giao hàng sẽ được INDECO liên hệ báo sau.</p>
                            </div>
                        </div>

                        <div style="font-size:13px;color:#555;margin-top:10px;border-top:1px solid #eee;padding-top:10px;">
                        <p>
                            Nếu quý khách có bất cứ câu hỏi nào, xin vui lòng liên hệ INDECO qua hotline 
                            <strong>032 849 4998</strong> hoặc email 
                            <a href="mailto:indecovietnam.fur@gmail.com" style="color:#3b5998;text-decoration:none;">indecovietnam.fur@gmail.com</a>.
                        </p>

                        <div style="display:flex;margin-top:10px;">
                            <div style="width:49%;">
                            <strong>INDECO VIETNAM</strong><br />
                            Xem thêm để hiểu biết thêm về chúng tôi
                            <div style="margin-top: 20px;">
                                <a href="https://www.facebook.com/profile.php?id=61576607768367&locale=vi_VN" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                    <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515620/indecovietnam/facebook_jbvypq.png" alt="Facebook" width="32" height="32" />
                                </a>
                                <a href="https://www.instagram.com/indeco.vietnam/" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                    <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515620/indecovietnam/instagram_nyrkvu.png" alt="Instagram" width="32" height="32" />
                                </a>
                                <a href="https://indecovietnam.com/" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                    <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515537/indecovietnam/web_1_jtfyte.png" alt="Website" width="32" height="32" />
                                </a>
                                <a href="https://www.tiktok.com/@indeco_vietnam?lang=vi-VN" target="_blank" style="margin: 0 5px; text-decoration: none;">
                                    <img src="https://res.cloudinary.com/dfermor0a/image/upload/v1760515538/indecovietnam/tiktok_djdapp.png" alt="TikTok" width="32" height="32"  />
                                </a>
                            </div>
                            </div>
                            <div style="width:49%;">
                            Bạn nhận được email này vì bạn đã đăng ký trên website hay mua hàng từ chúng tôi.
                            </div>
                        </div>
                        </div>
                        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
                    </div>
                </div>`
        };
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log("Email đã gửi:", info.response);
        } catch (error) {
            console.error("Lỗi gửi email:", error);
        }
    }
}