import { Logger } from 'winston';
import { URL } from 'url';
import { InvalidBookError } from './invalid-book-error';
import { HttpRequestEvent } from '../http/http-request-event';
import { HttpResponseEvent, HttpStatusCode } from '../http/http-response-event';
import { successMapper } from '../http/http-mappers';
import AWS from 'aws-sdk'

const isValidImage = (value: string): boolean => {
  try {
    new URL(value);
    return  value.endsWith('.jpg') || value.endsWith('.jpeg') || value.endsWith('.png');
  } catch (TypeError) {
    return false;
  }
}

export class BooksController {
  private logger: Logger;
  private dynamodbClient: AWS.DynamoDB.DocumentClient;
  private booksTable: string;

  constructor(
    logger: Logger,
    dynamodbClient: AWS.DynamoDB.DocumentClient,
    booksTable: string,
  ) {
    this.logger = logger;
    this.dynamodbClient = dynamodbClient;
    this.booksTable = booksTable;
  }

  public async listAllBooks(
    request: HttpRequestEvent,
  ): Promise<HttpResponseEvent> {
    this.logger.debug(
      `BooksController.listAllBooks received request=${JSON.stringify(
        request,
      )}`,
    );

    const {
      from,
    } = request.queryStringParameters || {};

    let params = {
      'TableName': this.booksTable,
      'Limit': 20,
    }

    if (from != null) {
      params['ExclusiveStartKey'] = { id: from };
    }

    const result = await this.dynamodbClient.scan(params).promise();

    const booksResponse = {
      books: result.Items != undefined ? result.Items : [],
      hasMore: result.LastEvaluatedKey != undefined,
      count: result.Items != undefined ? result.Items.length : 0,
    }

    return successMapper(booksResponse, HttpStatusCode.OK);
  }

  public async createBook(request: HttpRequestEvent): Promise<HttpResponseEvent> {
    this.logger.debug(
      `BooksController.createBook received request=${JSON.stringify(
        request,
      )}`,
    );

    const { title, authors, image } = JSON.parse(request.body);

    if (!title || !authors || !isValidImage(image)) {
      throw new InvalidBookError('The book is invalid')
    }

    const bookItem = {
      id: `${title} by ${authors}`,
      title,
      authors,
      image,
    };

    let params = {
      'TableName': this.booksTable,
      'Item': bookItem,
    }

    await this.dynamodbClient.put(params).promise();

    return successMapper(bookItem, HttpStatusCode.CREATED);
  }
}
