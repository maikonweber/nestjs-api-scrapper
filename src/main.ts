import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: true, // This will allow requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define the HTTP methods to be allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Define the allowed headers
  };

  app.enableCors();

  app.use(
    ['/api/docs'], // Rotas a serem protegidas
    basicAuth({
      challenge: true,
      users: { 'admin': 'mara128sio4' }, // Substitua por usuário e senha reais
    }),
  );


  const config = new DocumentBuilder()
    .setTitle('Mutter System API')
    .setDescription('Mutter System Api')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3001);
}
bootstrap()