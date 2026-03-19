export class ApiResponse<T = any> {
  status: 'success' | 'error';
  code: number;
  message: string;
  data?: T;

  constructor(code: number, message: string, data?: T) {
    this.status = code >= 400 ? 'error' : 'success';
    this.code = code;
    this.message = message;

    if (data !== undefined) {
      this.data = data;
    }
  }
}
