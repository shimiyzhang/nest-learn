import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Redirect,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Observable, of } from 'rxjs';
import { CreateCatDto, UpdateCatDto } from './dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  @Header('Cache-Control', 'none') // 自定义响应标头
  @HttpCode(201) // 状态码
  findAll(): string {
    return 'all cats';
  }

  // 请求负载
  // 通过 @Body() 装饰器来接收请求体中的数据。
  @Post()
  @Header('Cache-Control', 'none') // 自定义响应标头
  create(@Body() createCatDto: CreateCatDto) {
    console.log(createCatDto);
    return 'create cat';
  }

  // 路由参数（接受动态数据作为请求的一部分）
  // eg: GET /cats/1
  // *带有参数的路由应在任何静态路径之后声明。这样可以防止参数化路径截获发往静态路径的流量。
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() updateCatDto: UpdateCatDto) {
    console.log(updateCatDto);
    return `update #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id) {
    return `remove #${id} cat`;
  }

  // 路由通配符
  @Get('ab*cd')
  wildcard() {
    return 'this route uses a wildcard';
  }

  // 重定向
  // @Get()
  // @Redirect(url, statusCode), statusCode 默认值为 302(Found)
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    console.log(version);
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com' };
    }
  }

  // 异步性
  // Nest支持并很好地配合async函数
  // 每个异步函数都必须返回一个 Promise。
  @Get('async')
  async async(): Promise<any[]> {
    return [];
  }
  // Nest 路由处理程序通过能够返回 RxJS 可观察流
  @Get('stream')
  stream(): Observable<any[]> {
    return of([]);
  }

  // 子域路由
  // @Controller 装饰器可以采用一个 host 选项来要求传入请求的 HTTP 主机与某个特定值匹配。
  //
  //   @Controller({ host: ':account.example.com' })
  // export class AccountController {
  //   @Get()
  //   getInfo(@HostParam('account') account: string) {
  //     return account;
  //   }
  // }

  // 特定于库的方法
  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //    res.status(HttpStatus.OK).json([]);
  // }

  // 将选项 passthrough 设置为 true, 与本机响应对象进行交互（例如，根据特定条件设置 cookie 或标头），但将其余部分留给框架。
  // @Get()
  // findAll(@Res({ passthrough: true }) res: Response) {
  // res.status(HttpStatus.OK);
  // return [];
  // }
}
