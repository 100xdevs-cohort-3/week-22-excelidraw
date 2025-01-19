export const throwError = (statusCode: number, message: string): never => {
  const error: any = new Error(message);
  error.status = statusCode;
  throw error;
};
