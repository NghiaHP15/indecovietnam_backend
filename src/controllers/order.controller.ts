import { Request, Response } from "express";
import * as orderService from "../services/order.service";
import * as customerService from "../services/customer.service";
import { successResponse, errorResponse, singleResponse } from "../utils/response";
import { OrderStatus, PaymentMethod, PaymentStatus, TypeNotification } from "../utils/enum";
import { VNPayService } from "../services/vnpay.service";
import { BankPayService } from "../services/bankpay.service";
import { MomoService } from "../services/momo.service";
import { generateTxnRef, generateUUID } from "../config/contant";
import { getClientIp } from "../utils/crypto.hepler";
import { createNoti } from "../services/notification.service";

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const results = await orderService.getAllOrders(req.query);
        successResponse(res, "Successfully fetched all order ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderService.getOrderById(id);
        singleResponse(res, "Order found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getOrderByTxnRef = async (req: Request, res: Response) => {
    const txnRef = req.params.txnRef;
    try {
        const result = await orderService.getOrderByTxnRef(txnRef);
        singleResponse(res, "Order found", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const createOrder = async (req: Request, res: Response) => {
    const { paymentmethod, total_amount, bankCode, customer } = req.body;
    // ✅ Lấy IP của client
    const ip = getClientIp(req)
    // ✅ Tạo ID thanh toán
    const txnRef = generateTxnRef(paymentmethod, customer.id);;
    // 🔹 Lưu đơn hàng trước khi tạo UR
    
    try {
        const exisCustomer = await customerService.getCustomerById(customer.id);
        const order = await orderService.createOrder({total_amount, txnRef, ...req.body});
        let url: string;
        switch (paymentmethod) {
            case PaymentMethod.VNPAY:
                url = await VNPayService.createPaymentUrl({ total_amount: order.total_amount, ip, bankCode, txnRef });
                break;
            case PaymentMethod.BANK:
                url = await BankPayService.createPayment({ txnRef });
                break;
            case PaymentMethod.MOMO:
                url = await MomoService.createPayment({ total_amount: order.total_amount, txnRef });
                break;
            default:
                res.status(400).json({ message: "Payment method not supported!" });
                return;
        }
        
        createNoti({
            message: `📦 Bạn có thông báo đơn hàng mới`,
            type: TypeNotification.ORDER,
            order: { id: order.id },
            name: exisCustomer?.firstname + ' ' + exisCustomer?.lastname,
            avatar: exisCustomer?.avatar,
        })
        singleResponse(res, "Success", { paymentUrl: url });
    } catch (error) {
        errorResponse(res, error);
    }
}

export const retryPayment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { paymentmethod } = req.body;
    try {
        const order = await orderService.getOrderById(id);
        
        if (!order)  {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        if([PaymentStatus.FAILED, PaymentStatus.PENDING].includes(order.payment_status) && order.status === OrderStatus.PENDING) {
            const newTxnRef = generateTxnRef(paymentmethod, order.customer.id);
            
            await orderService.updateOrder(id, { ...order, txnRef: newTxnRef});
            
            let url: string;

            switch (paymentmethod) {
                case PaymentMethod.VNPAY:
                    url = await VNPayService.createPaymentUrl({ total_amount: order.total_amount, ip: getClientIp(req), txnRef: newTxnRef });
                    break;
                case PaymentMethod.BANK:
                    url = await BankPayService.createPayment({ txnRef: newTxnRef });
                    break;
                case PaymentMethod.MOMO:
                    url = await MomoService.createPayment({ total_amount: order.total_amount, txnRef: newTxnRef });
                    break;
                default:
                    res.status(400).json({ message: "Payment method not supported!" });
                    return;
            }
            singleResponse(res, "Retry payment URL created", { paymentUrl: url });
        }
    } catch (error) {
        errorResponse(res, error);
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const result = await orderService.updateOrder(id, req.body);
        singleResponse(res, "Order updated", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const cancelOrder = async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        let result: boolean = false;
        result = await orderService.cancelOrder(id);
        singleResponse(res, "Order deleted", result);
    } catch (error) {
        errorResponse(res, error);
    }
}

export const getSearchOrders = async (req: Request, res: Response) => {
    try {
        const results = await orderService.getSearchOrders(req.query);
        successResponse(res, "Successfully fetched all order ", results, { total: results.length, page: Number(req.query.page || 1), limit: Number(req.query.limit || 10) });
    } catch (error) {
        errorResponse(res, error);
    }
}


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