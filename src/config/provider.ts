import winston, { Logger } from 'winston';
import {
  DynamoDB,
} from 'aws-sdk';

const dynamoDBClient = new DynamoDB.DocumentClient();

import { BooksController } from '../books/books-controller';

const {
  LOG_LEVEL,
  BOOKS_TABLE,
} = process.env;

const logger: Logger = winston.createLogger({
  level: LOG_LEVEL || 'debug',
  transports: [new winston.transports.Console()],
});

const getLogger: () => Logger = () => logger;
const newBooksController: () => BooksController = () => new BooksController(logger, dynamoDBClient, BOOKS_TABLE);

export const provider = {
  getLogger,
  newBooksController,
}
