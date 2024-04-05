import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { StudentsModule } from './students/students.module';
import { ClassesModule } from './classes/classes.module';
import { join } from 'path';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { UrlGeneratorModule } from 'nestjs-url-generator';
import { HateoasIndex } from './core/hateoas/index-hateoas';
import { AuthModule } from './auth/auth.module';
import { StudentClassesModule } from './student-classes/student-classes.module';

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
    AuthModule,
    UsersModule,
    StudentsModule,
    ClassesModule,
    UrlGeneratorModule.forRoot({
      appUrl: 'http://localhost:3000',
    }),
    StudentClassesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    HateoasIndex,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
