export interface ResponseGlobalInterface<T> {
  data: T;
  message: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}
