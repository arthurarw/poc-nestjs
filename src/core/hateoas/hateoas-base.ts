import { Injectable } from '@nestjs/common';
import { HateoasLinks } from './hateoas-interface';
import {
  ControllerClass,
  ControllerMethod,
  UrlGeneratorService,
} from 'nestjs-url-generator';

@Injectable()
export abstract class HateoasBase {
  constructor(public urlGeneratorService: UrlGeneratorService) {}

  LINKS: HateoasLinks[] = [];

  abstract generateLinkHateoas(): HateoasLinks[];

  protected addLinks(
    method: string,
    description: string,
    controller: ControllerClass,
    controllerMethod: ControllerMethod,
    params?,
  ) {
    this.LINKS.push({
      type: method,
      rel: description,
      uri: this.urlGeneratorService.generateUrlFromController({
        controller,
        controllerMethod,
        params,
      }),
    });
  }
}
