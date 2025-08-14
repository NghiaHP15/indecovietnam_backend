export const successResponse = (
    res: any,
    message: string,
    data: any,
    {  ...pageInfo }: { message?: string; total: number; page: number; limit: number }
) => {
    return res.status(200).json({
        success: true,
        message,
        data,
        pageInfo: pageInfo,
    });
}

export const singleResponse = (res: any, message: string, data: any) => {
  return res.status(200).json({
    success: true,
    message,
    data
  });
};

export const errorResponse = (
    res: any,
    error: any,
    defaultStatusCode = 400
) => {
    return res.status(error.statusCode || defaultStatusCode).json({
        success: false,
        message: (error as Error).message || "Internal Server Error",
    });
}

export function createError(message: string, statusCode = 400) {
  const error = new Error(message) as any;
  error.statusCode = statusCode;
  return error;
}