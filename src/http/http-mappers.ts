import { InvalidBookError } from '../books/invalid-book-error';
import { HttpResponseEvent, HttpStatusCode } from './http-response-event';

export type ProblemDetail = {
  type: string,
  title: string,
  detail?: string,
  status?: number,
  instance?: string,
}

export const errorMapper: (
  error: Error
) => HttpResponseEvent = (error: Error) => {
  let problemDetail: ProblemDetail;

  if (error instanceof InvalidBookError) {
    problemDetail = {
      status: HttpStatusCode.BAD_REQUEST,
      type: 'books-api/bad-request',
      title: 'The book is invalid!',
    };
  } else {
    problemDetail = {
      status: HttpStatusCode.SERVER_ERROR,
      type: 'books-api/server-error',
      title: 'A Server Error Happened!',
    };
  }

  return {
    statusCode: problemDetail.status,
    body: JSON.stringify(problemDetail),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const successMapper: (
  resource: Record<string, unknown> | Array<Record<string, unknown>>,
  statusCode: HttpStatusCode
) => HttpResponseEvent = (
  resource: Record<string, unknown> | Array<Record<string, unknown>>,
  statusCode: HttpStatusCode
) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(resource),
    headers: {
      'Content-Type': 'application/json',
    },
  };
};
