class ErrorResponse extends Error {
  statusCode: string | number;

  constructor(message: any, statusCode: number | string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
