import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    response.on('finish', () => {
      console.log(
        `[${request.method}] ${request.originalUrl} - ${response.statusCode}`,
      );
    });

    next();
  }
}
