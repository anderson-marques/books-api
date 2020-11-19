export class InvalidBookError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, InvalidBookError.prototype);
  }
}
