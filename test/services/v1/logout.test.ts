import app from '../../../src/app';

describe('\'v1/logout\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/logout');
    expect(service).toBeTruthy();
  });
});
