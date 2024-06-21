import app from '../../../src/app';

describe('\'v1/update-user-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/update-user-profile');
    expect(service).toBeTruthy();
  });
});
