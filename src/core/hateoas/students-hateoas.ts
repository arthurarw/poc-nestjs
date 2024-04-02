import { StudentsController } from 'src/students/students.controller';
import { HateoasBase } from './hateoas-base';
import { HateoasLinks } from './hateoas-interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HateoasStudents extends HateoasBase {
  generateLinkHateoas(id?: number): HateoasLinks[] {
    this.LINKS = [];

    const params = {
      id,
    };

    this.addLinks(
      'GET',
      'self',
      StudentsController,
      StudentsController.prototype.findOne,
      params,
    );
    this.addLinks(
      'PATCH',
      'self',
      StudentsController,
      StudentsController.prototype.update,
      params,
    );
    this.addLinks(
      'DELETE',
      'self',
      StudentsController,
      StudentsController.prototype.remove,
      params,
    );

    return this.LINKS;
  }
}
