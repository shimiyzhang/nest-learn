import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

// 守卫
// 守卫是一个用 @Injectable() 装饰器注释的类，它实现了 CanActivate 接口。
// 授权守卫
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    if (request.baseUrl) {
      return true;
    }
    return false;
  }
}
