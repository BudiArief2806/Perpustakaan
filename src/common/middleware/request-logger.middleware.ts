// Import kebutuhan middleware dari NestJS.
import { Injectable, NestMiddleware } from '@nestjs/common';
// Import tipe request, response, dan next dari Express.
import { NextFunction, Request, Response } from 'express';

// Export middleware ini agar bisa didaftarkan di AppModule.
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
