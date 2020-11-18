import { errorMapper } from './http/http-mappers'
import { HttpRequestEvent } from './http/http-request-event';
import { HttpResponseEvent } from './http/http-response-event';
import { provider } from './config/provider';

const logger = provider.getLogger();
const booksController = provider.newBooksController();

export const handler = async (
  request: HttpRequestEvent,
): Promise<HttpResponseEvent> => {
  logger.debug(`handler request=${JSON.stringify(request)}`);
  let response: HttpResponseEvent;
  try {
    response = await booksController.listAllBooks(request), 200;
  } catch (error) {
    response = errorMapper(error);
  }
  logger.debug(`handler response=${JSON.stringify(response)}`);
  return response;
};
