import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HateoasIndex } from './core/hateoas/index-hateoas';
import RabbitServer from './commons/queue/rabbit-server';
import { Public } from './auth/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private hateoasIndex: HateoasIndex,
  ) {}

  @Get()
  index() {
    return this.hateoasIndex.generateLinkHateoas();
  }

  @Public()
  @Get('/queue')
  async queue() {
    const server = new RabbitServer(
      `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:5672`,
    );

    await server.start();

    await server.publishInQueue(
      'waiting_list',
      JSON.stringify({ name: 'John Doe' }),
    );

    await server.publishInExchange(
      'amq.direct',
      'students',
      JSON.stringify({ name: 'John Doe Exchange' }),
    );
  }
}
