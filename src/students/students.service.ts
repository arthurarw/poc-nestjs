import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { StudentNotFoundException } from './exceptions/student-not-found.exception';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student) private repository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto) {
    const student = this.repository.create(createStudentDto);
    return await this.repository.save(student);
  }

  async findAll(options: IPaginationOptions) {
    const query = await this.repository
      .createQueryBuilder('students')
      .leftJoinAndSelect('students.class', 'class')
      .orderBy('students.id', 'ASC');

    return await paginate(query, options);
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new StudentNotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    const response = await this.repository.update(id, updateStudentDto);
    if (response.affected === 0) {
      throw new StudentNotFoundException();
    }

    return { message: 'Student updated successfully', success: true };
  }

  async remove(id: number) {
    const response = await this.repository.delete({ id: id });
    if (response.affected === 0) {
      throw new StudentNotFoundException();
    }

    return { message: 'Student deleted successfully', success: true };
  }
}
