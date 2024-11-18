import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, PinoLogger } from 'nestjs-pino';
import { v4 as uuidv4 } from 'uuid';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true, 
  });

  // Створення PinoLogger
  const pinoLogger = new PinoLogger({
    pinoHttp: {
      genReqId: (req) => {
        const requestId = req.headers['x-request-id'] || uuidv4();
        req.headers['x-request-id'] = requestId;
        return requestId;
      },
      customProps: (req, res) => ({
        requestId: req.headers['x-request-id'],
      }),
      transport:
        process.env.NODE_ENV !== 'production'
          ? { target: 'pino-pretty', options: { colorize: true } }
          : undefined,
    },
  });

  
  app.useLogger(
    new Logger(pinoLogger, {
      renameContext: 'app', 
    }),
  );

  // Налаштування Swagger
  const config = new DocumentBuilder()
    .setTitle('Payment Service')
    .setDescription('API for Payment Service')
    .setVersion('1.0')
    .addTag('payments')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  await app.listen(3000);
}
bootstrap();
