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
      'student_details',
      StudentsController,
      StudentsController.prototype.findOne,
      params,
    );
    this.addLinks(
      'PATCH',
      'student_update',
      StudentsController,
      StudentsController.prototype.update,
      params,
    );
    this.addLinks(
      'DELETE',
      'student_delete',
      StudentsController,
      StudentsController.prototype.remove,
      params,
    );

    return this.LINKS;
  }
}
