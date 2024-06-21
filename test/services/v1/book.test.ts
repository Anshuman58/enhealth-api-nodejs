import app from '../../../src/app';

describe('\'v1/book\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/book');
    expect(service).toBeTruthy();
  });
});
