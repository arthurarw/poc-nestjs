import { Class } from 'src/classes/entities/class.entity';
import { HateoasLinks } from 'src/core/hateoas/hateoas-interface';

export class ResponseStudentDto {
  id: number;
  name: string;
  gender: string;
  class: Class[];
  links?: HateoasLinks[];
}
