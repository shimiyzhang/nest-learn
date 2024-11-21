import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';

@Module({
  imports: [CatsModule],
})

// 模块实现 NestModule 接口，使用模块类的 configure 方法设置中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(logger) // 使用函数中间件
      .apply(LoggerMiddleware)
      .exclude(
        // { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
      ) // 排除路由
      // .forRoutes('cats') // 特定路由作为中间件消费者
      // .forRoutes({ path: 'cats', method: RequestMethod.GET }); // 将中间件限制为特定的路由（支持路由通配符）和请求方法
      .forRoutes(CatsController); // 控制器作为中间件消费者
  }
}
