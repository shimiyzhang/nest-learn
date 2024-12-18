import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { logger } from './common/middleware/logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 全局中间件
  app.use(logger);
  // 全局作用域的过滤器
  app.useGlobalFilters(new HttpExceptionFilter());
  // 全局作用域的验证管道
  app.useGlobalPipes(new ValidationPipe());
  // 全局守卫
  app.useGlobalGuards(new RolesGuard(new Reflector()));
  await app.listen(3000);
}
bootstrap();
