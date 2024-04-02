import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.23.0.3',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'app_nestjs',
      entities: [join(__dirname, '**/*entity.{ts,js}')],
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UsersModule,
    StudentsModule,
    ClassesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
