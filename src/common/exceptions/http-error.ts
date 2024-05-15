export class HttpError extends Error {
  status: number;
  response: {
    status: string;
    message: string;
  };

  constructor(status: number, code: string, message: string) {
    super();
    this.status = status;
    this.response = {
      status: code,
      message: message,
    };
  }
}
