export interface IJwtPayload {
  user: string;
  dni: number;
  cargo: string;
  iat?: Date;
}