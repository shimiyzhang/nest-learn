import { Reflector } from '@nestjs/core';

// Nest 提供了通过 Reflector#createDecorator 静态方法创建的装饰器或内置 @SetMetadata() 装饰器将自定义元数据附加到路由处理程序的功能
// 使用 Reflector#createDecorator 方法创建一个 @Roles() 装饰器，该方法将元数据附加到处理程序
export const Roles = Reflector.createDecorator<string[]>();
