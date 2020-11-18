export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  SERVER_ERROR = 500,
}

export type HttpResponseEvent = {
  statusCode: HttpStatusCode,
  headers?: Record<string, string>,
  body?:string,
}
