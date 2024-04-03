import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  async findAll(options: IPaginationOptions) {
    const query = await this.repository
      .createQueryBuilder('users')
      .select([
        'users.id',
        'users.name',
        'users.email',
        'users.user_type',
        'users.created_at',
        'users.updated_at',
      ])
      .orderBy('users.id', 'ASC');

    return await paginate(query, options);
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneByOrFail({ id: id });
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new NotFoundException();
      }

      throw new InternalServerErrorException();
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const response = await this.repository.update(id, updateUserDto);
    if (response.affected === 0) {
      throw new NotFoundException();
    }

    return { message: 'User updated successfully', success: true };
  }

  async remove(id: number) {
    const response = await this.repository.delete({ id: id });
    if (response.affected === 0) {
      throw new NotFoundException();
    }

    return { message: 'User deleted successfully', success: true };
  }
}
