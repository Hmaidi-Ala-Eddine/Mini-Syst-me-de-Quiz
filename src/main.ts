import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Quiz API')
    .setDescription('Mini Quiz System for Students')
    .setVersion('1.0')
    .addBearerAuth()  
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);  // route /api swagger

  await app.listen(3000);
}
bootstrap();
