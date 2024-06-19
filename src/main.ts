import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: true, // This will allow requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Define the HTTP methods to be allowed
    allowedHeaders: ['Content-Type', 'Authorization'], // Define the allowed headers
  };

  app.enableCors();


  const config = new DocumentBuilder()
    .setTitle('Mutter System API')
    .setDescription('Mutter System Api')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3032);
}
bootstrap();
