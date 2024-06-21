import app from '../../../src/app';

describe('\'v1/book-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/book-management');
    expect(service).toBeTruthy();
  });
});
