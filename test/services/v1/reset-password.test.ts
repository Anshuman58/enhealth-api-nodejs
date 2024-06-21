import app from '../../../src/app';

describe('\'v1/reset-password\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/reset-password');
    expect(service).toBeTruthy();
  });
});
