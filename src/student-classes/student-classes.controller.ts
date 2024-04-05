import { Controller } from '@nestjs/common';
import { StudentClassesService } from './student-classes.service';

@Controller('student-classes')
export class StudentClassesController {
  constructor(private readonly studentClassesService: StudentClassesService) {}
}
