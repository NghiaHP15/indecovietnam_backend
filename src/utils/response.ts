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
        pageInfo,
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
    error: unknown,
    statusCode = 500
) => {
    return res.status(statusCode).json({
        success: false,
        message: (error as Error).message || "Internal Server Error",
    });
}