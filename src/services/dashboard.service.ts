import { customerRepo } from "../repositories/customer.repository";
import { feedbackRepo } from "../repositories/feedback.repository";
import { orderRepo } from "../repositories/order.repository";
import { productVariantRepo } from "../repositories/productVariant.repository";
import { OrderStatus } from "../utils/enum";

export const getTotalOrders = async (): Promise<any> => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const lastYear = thisYear - 1;

    const startOfThisYear = new Date(thisYear, 0, 1);
    const endOfThisYear = new Date(thisYear, 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(lastYear, 0, 1);
    const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);

    const { totalThisYear } = await orderRepo
        .createQueryBuilder("order")
        .select("COALESCE(SUM(order.total_amount), 0)", "totalThisYear")
        .where("order.created_at BETWEEN :startOfThisYear AND :endOfThisYear", { startOfThisYear, endOfThisYear })
        .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
        .getRawOne();

    const { totalLastYear } = await orderRepo
        .createQueryBuilder("order")
        .select("COALESCE(SUM(order.total_amount), 0)", "totalLastYear")
        .where("order.created_at BETWEEN :startOfLastYear AND :endOfLastYear", { startOfLastYear, endOfLastYear })
        .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
        .getRawOne();

    const totalThis = Number(totalThisYear) || 0;
    const totalLast = Number(totalLastYear) || 0;

    let percent = 0;
    if (totalLast > 0) {
        percent = ((totalThis - totalLast) / totalLast) * 100;
    } else if (totalThis > 0) {
        percent = 100; // năm ngoái = 0, năm nay có doanh thu → tăng 100%
    }

    return { 
        totalThisYear, 
        totalLastYear, 
        percent,
        isIncrease: percent >= 0 ? true : false
    };
}

export const getSumOrders = async (): Promise<any> => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const lastYear = thisYear - 1;

    const startOfThisYear = new Date(thisYear, 0, 1);
    const endOfThisYear = new Date(thisYear, 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(lastYear, 0, 1);
    const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);

    const { countThisYear } = await orderRepo
        .createQueryBuilder("order")
        .select("COUNT(*)", "countThisYear")
        .where("order.created_at BETWEEN :startOfThisYear AND :endOfThisYear", { startOfThisYear, endOfThisYear })
        .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
        .getRawOne();

    const { countLastYear } = await orderRepo
        .createQueryBuilder("order")
        .select("COUNT(*)", "countLastYear")
        .where("order.created_at BETWEEN :startOfLastYear AND :endOfLastYear", { startOfLastYear, endOfLastYear })
        .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
        .getRawOne();

    const totalThis = Number(countThisYear) || 0;
    const totalLast = Number(countLastYear) || 0;

    let percent = 0;
    if (totalLast > 0) {
        percent = ((totalThis - totalLast) / totalLast) * 100;
    } else if (totalThis > 0) {
        percent = 100; // năm ngoái = 0, năm nay có doanh thu → tăng 100%
    }

    return { 
        countThisYear, 
        countLastYear, 
        percent,
        isIncrease: percent >= 0 ? true : false
    };
}

export const getSumFeedbacks = async (): Promise<any> => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const lastYear = thisYear - 1;

    const startOfThisYear = new Date(thisYear, 0, 1);
    const endOfThisYear = new Date(thisYear, 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(lastYear, 0, 1);
    const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);

    const { countThisYear } = await feedbackRepo
        .createQueryBuilder("feedback")
        .select("COUNT(*)", "countThisYear")
        .where("feedback.created_at BETWEEN :startOfThisYear AND :endOfThisYear", { startOfThisYear, endOfThisYear })
        .getRawOne();

    const { countLastYear } = await feedbackRepo
        .createQueryBuilder("feedback")
        .select("COUNT(*)", "countLastYear")
        .where("feedback.created_at BETWEEN :startOfLastYear AND :endOfLastYear", { startOfLastYear, endOfLastYear })
        .getRawOne();

    const totalThis = Number(countThisYear) || 0;
    const totalLast = Number(countLastYear) || 0;

    let percent = 0;
    if (totalLast > 0) {
        percent = ((totalThis - totalLast) / totalLast) * 100;
    } else if (totalThis > 0) {
        percent = 100; // năm ngoái = 0, năm nay có doanh thu → tăng 100%
    }

    return { 
        countThisYear, 
        countLastYear, 
        percent,
        isIncrease: percent >= 0 ? true : false
    };
}

export const getSumCustomers = async (): Promise<any> => {
    const now = new Date();
    const thisYear = now.getFullYear();
    const lastYear = thisYear - 1;

    const startOfThisYear = new Date(thisYear, 0, 1);
    const endOfThisYear = new Date(thisYear, 11, 31, 23, 59, 59, 999);

    const startOfLastYear = new Date(lastYear, 0, 1);
    const endOfLastYear = new Date(lastYear, 11, 31, 23, 59, 59, 999);

    const { countThisYear } = await customerRepo
        .createQueryBuilder("customer")
        .select("COUNT(*)", "countThisYear")
        .where("customer.created_at BETWEEN :startOfThisYear AND :endOfThisYear", { startOfThisYear, endOfThisYear })
        .getRawOne();

    const { countLastYear } = await customerRepo
        .createQueryBuilder("customer")
        .select("COUNT(*)", "countLastYear")
        .where("customer.created_at BETWEEN :startOfLastYear AND :endOfLastYear", { startOfLastYear, endOfLastYear })
        .getRawOne();

    const totalThis = Number(countThisYear) || 0;
    const totalLast = Number(countLastYear) || 0;

    let percent = 0;
    if (totalLast > 0) {
        percent = ((totalThis - totalLast) / totalLast) * 100;
    } else if (totalThis > 0) {
        percent = 100; // năm ngoái = 0, năm nay có doanh thu → tăng 100%
    }

    return { 
        countThisYear, 
        countLastYear, 
        percent,
        isIncrease: percent >= 0 ? true : false
    };
}

export const getCustomerByTotalOrders = async (limit: number): Promise<any> => {
    const customers = await customerRepo
        .createQueryBuilder("customer")
        .leftJoin("customer.orders", "order", "order.status = :status", { status: OrderStatus.DELIVERED }) 
        .select([
            "customer.id AS id",
            "customer.firstname AS firstname",
            "customer.lastname AS lastname",
            "customer.email AS email",
            "COALESCE(SUM(order.total_amount), 0) AS totalSpent"
        ])
        // .where("order.status = :status", { status: OrderStatus.DELIVERED })
        .groupBy("customer.id")
        .addGroupBy("customer.firstname")
        .addGroupBy("customer.lastname")
        .addGroupBy("customer.email")
        .orderBy("totalSpent", "DESC")
        .limit(limit)
        .getRawMany();
    
    return customers.map(item => ({
        id: item.id,
        firstname: item.firstname,
        lastname: item.lastname,
        email: item.email,
        totalSpent: Number(item.totalspent)
    }));
}

export const getNewOrders = async (limit: number): Promise<any> => {
    
    const [orders] = await orderRepo.findAndCount({ 
        relations: ['customer', 'products', 'address'],
        order: {
            created_at: 'desc',
        },
        take: limit,
    });
    
    return orders.map(item => ({
        id: item.id,
        txnRef: item.txnRef,
        total_amount: item.total_amount,
        customer_name: item.customer.firstname + ' ' + item.customer.lastname,
        status: item.status,
        payment_status: item.payment_status,
    }));
}

export const getTopProduts = async (limit: number): Promise<any> => {

    const [variants] = await productVariantRepo.findAndCount({ 
        relations: ['product', 'color'],
        order: {
            quantity_selled: 'desc',
        },
        take: limit,
    });

    return variants.map(item => ({
        id: item.id,
        sku: item.sku,
        color: { name: item.color.name, code: item.color.code },
        size: item.size,
        image: item.image,
        price: item.price,
        product: { name: item.product.name, },
    }));
}

export const getRevenueAndOrdersByMonth = async () => {
  const now = new Date();
  const thisYear = now.getFullYear();
  const lastYear = thisYear - 1;

  // Query năm nay
  const thisYearData = await orderRepo
    .createQueryBuilder("order")
    .select("EXTRACT(MONTH FROM order.created_at)", "month")
    .addSelect("COALESCE(SUM(order.total_amount), 0)", "revenue")
    .addSelect("COUNT(order.id)", "orders")
    .where("EXTRACT(YEAR FROM order.created_at) = :thisYear", { thisYear })
    .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
    .groupBy("month")
    .getRawMany();

  // Query năm ngoái
  const lastYearData = await orderRepo
    .createQueryBuilder("order")
    .select("EXTRACT(MONTH FROM order.created_at)", "month")
    .addSelect("COALESCE(SUM(order.total_amount), 0)", "revenue")
    .addSelect("COUNT(order.id)", "orders")
    .where("EXTRACT(YEAR FROM order.created_at) = :lastYear", { lastYear })
    .andWhere("order.status = :status", { status: OrderStatus.DELIVERED })
    .groupBy("month")
    .getRawMany();

  // Tạo mảng 12 tháng mặc định
  const initArray = Array(12).fill(0);

  // Fill dữ liệu năm nay
  const revenueThisYear = [...initArray];
  const ordersThisYear = [...initArray];
  thisYearData.forEach((row) => {
    const monthIndex = Number(row.month) - 1;
    revenueThisYear[monthIndex] = Number(row.revenue);
    ordersThisYear[monthIndex] = Number(row.orders);
  });

  // Fill dữ liệu năm ngoái
  const revenueLastYear = [...initArray];
  const ordersLastYear = [...initArray];
  lastYearData.forEach((row) => {
    const monthIndex = Number(row.month) - 1;
    revenueLastYear[monthIndex] = Number(row.revenue);
    ordersLastYear[monthIndex] = Number(row.orders);
  });

  return {
    [thisYear]: [
      { name: "price", data: revenueThisYear },
      { name: "order", data: ordersThisYear },
    ],
    [lastYear]: [
      { name: "price", data: revenueLastYear },
      { name: "order", data: ordersLastYear },
    ],
  };
};


