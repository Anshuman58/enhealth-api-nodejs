import app from '../../../src/app';

describe('\'v1/social-login\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/social-login');
    expect(service).toBeTruthy();
  });
});
