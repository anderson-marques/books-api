import { Logger } from 'winston';
import { BooksController } from './books-controller';

describe('BooksController', () => {
  it('should be defined', () => {
    expect(BooksController).toBeDefined();
  });

  describe('instance', () => {
    const logger = (jest.fn() as unknown) as Logger;
    const dynamodbclient = (jest.fn() as unknown) as AWS.DynamoDB.DocumentClient;
    const tableName = 'some-table';
    const instance = new BooksController(
      logger,
      dynamodbclient,
      tableName,
    );

    it('should be defined', () => {
      expect(instance).toBeDefined();
    });

    it('#listAllBooks should be defined', () => {
      expect(instance.listAllBooks).toBeDefined();
    });

    it('#createBook should be defined', () => {
      expect(instance.createBook).toBeDefined();
    });
  });
});
