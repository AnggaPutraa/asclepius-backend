import { HttpError } from './http-error';

export class BadRequestException extends HttpError {
  constructor(message?: string) {
    super(400, 'fail', message || 'Terjadi kesalahan');
  }
}
