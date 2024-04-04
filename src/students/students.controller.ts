import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ResponseStudentDto } from './dto/response-student.dto';
import { HateoasStudents } from 'src/core/hateoas/students-hateoas';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/decorators/public.decorator';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private studentsHateoas: HateoasStudents,
  ) {}

  @Public()
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto) {
    const response: ResponseStudentDto =
      await this.studentsService.create(createStudentDto);
    response.links = this.studentsHateoas.generateLinkHateoas(response.id);

    return response;
  }

  @Get()
  async findAll(@Query('page') page = 1, @Query('limit') limit = 2) {
    limit = limit > 100 ? 10 : limit;
    const students = await this.studentsService.findAll({ page, limit });
    students.items.map((student) => {
      const response: ResponseStudentDto = student;
      response.links = this.studentsHateoas.generateLinkHateoas(student.id);
      return response;
    });

    return students;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response: ResponseStudentDto =
      await this.studentsService.findOne(+id);
    response.links = this.studentsHateoas.generateLinkHateoas(response.id);
    return response;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return await this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(+id);
  }
}
