import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { HateoasIndex } from './core/hateoas/index-hateoas';

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
}
