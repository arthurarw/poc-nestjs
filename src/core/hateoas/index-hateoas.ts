import { StudentsController } from 'src/students/students.controller';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HateoasIndex extends HateoasBase {
  generateLinkHateoas(): HateoasLinks[] {
    this.LINKS = [];

    this.addLinks(
      'POST',
      'store_student',
      StudentsController,
      StudentsController.prototype.create,
    );

    this.addLinks(
      'GET',
      'list_all_students',
      StudentsController,
      StudentsController.prototype.findAll,
    );

    return this.LINKS;
  }
}
