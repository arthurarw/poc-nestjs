import { Module } from '@nestjs/common';
import { StudentClassesService } from './student-classes.service';
import { StudentClassesController } from './student-classes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentClass } from './entities/student-classes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentClass])],
  controllers: [StudentClassesController],
  providers: [StudentClassesService],
})
export class StudentClassesModule {}
