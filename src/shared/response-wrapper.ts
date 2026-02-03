export interface ResponseWrapper<T> {
  status: number;
  data: T | null;
  message: string;
}

export function successResponse<T>(
  status: number,
  data: T,
  message: string
): ResponseWrapper<T> {
  return {
    status,
    data,
    message,
  };
}

export function errorResponse(
  status: number,
  message: string
): ResponseWrapper<null> {
  return {
    status,
    data: null,
    message,
  };
}
