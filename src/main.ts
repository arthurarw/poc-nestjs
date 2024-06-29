import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import RabbitServer from './commons/queue/rabbit-server';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('API REST')
    .setDescription('API description with NestJS')
    .setVersion('1.0')
    .addTag('students')
    .addTag('classes')
    .addTag('users')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const consumeWaitingListQueue = async () => {
    const server = new RabbitServer(
      `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@rabbitmq:5672`,
    );

    await server.start();
    await server.consume('waiting_list', (message) => {
      console.log(message.content.toString());
    });
  };

  await consumeWaitingListQueue();

  await app.listen(3000);
}
bootstrap();
