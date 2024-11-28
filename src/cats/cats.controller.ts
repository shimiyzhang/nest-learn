import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { ForbiddenException } from 'src/common/exception/forbidden.exception';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ExcludeNullInterceptor } from 'src/common/interceptors/excludeNull.interceptor';
import { LoggingInterceptor } from 'src/common/interceptors/logging.interceptor';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './interfaces/cat.interface';

// 将过滤器设置为控制器作用域
@Controller('cats')
@UseFilters(HttpExceptionFilter)
@UseGuards(RolesGuard)
@UseInterceptors(
  LoggingInterceptor,
  TransformInterceptor,
  ExcludeNullInterceptor,
)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  // 使用过滤器
  // 尽可能使用类而不是实例来应用过滤器。它减少了内存使用量，因为 Nest 可以轻松地在整个模块中重用同一类的实例。
  @UseFilters(HttpExceptionFilter)
  // @UseFilters(new HttpExceptionFilter())
  @Roles(['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();

    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    // 抛出标准异常
    // try {
    //   await this.catsService.findAll();
    // } catch (error) {
    //   throw new HttpException(
    //     {
    //       status: HttpStatus.FORBIDDEN,
    //       error: 'This is a custom message',
    //     },
    //     HttpStatus.FORBIDDEN,
    //     {
    //       cause: error,
    //     },
    //   );
    // }

    // 自定义异常
    // throw new ForbiddenException();

    // 内置 HTTP 异常
    // throw new BadRequestException('Something bad happened', {
    //   cause: new Error(),
    //   description: 'Some error description',
    // });
  }

  @Get('/:id')
  // 绑定管道
  // 在方法参数级别绑定管道
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
    @User('firstName') firstName: string,
  ) {
    return {
      id,
      firstName,
    };
  }
}
