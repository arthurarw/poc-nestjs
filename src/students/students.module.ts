import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { HateoasStudents } from 'src/core/hateoas/students-hateoas';
import { Class } from 'src/classes/entities/class.entity';
import { StudentClass } from 'src/student-classes/entities/student-classes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class, StudentClass])],
  controllers: [StudentsController],
  providers: [StudentsService, HateoasStudents],
})
export class StudentsModule {}
