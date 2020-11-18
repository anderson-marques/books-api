import { provider } from './provider';

describe('provider', () => {
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('.getLogger', () => {
    it('should be defined', () => {
      expect(provider.getLogger).toBeDefined();
    });
  });

  describe('.newBooksController', () => {
    it('#newBooksController should be defined', () => {
      expect(provider.newBooksController).toBeDefined();
    });
  });
});
