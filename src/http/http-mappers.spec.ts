import { errorMapper, successMapper } from './http-mappers';

describe('errorMapper', () => {
  it('should be defined', () => {
    expect(errorMapper).toBeDefined();
  });
});

describe('successMapper', () => {
  it('should be defined', () => {
    expect(successMapper).toBeDefined();
  });
});
