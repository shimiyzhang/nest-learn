import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log('Request...');
    next();
  }
}

// 函数中间件（当你的中间件不需要任何依赖时，请考虑使用更简单的函数中间件替代方案。）
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('Request...');
  next();
}
