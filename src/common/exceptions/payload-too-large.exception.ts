import { HttpError } from './http-error';

export class PayloadTooLargeException extends HttpError {
  constructor() {
    super(
      413,
      'fail',
      'Payload content length greater than maximum allowed: 1000000',
    );
  }
}
