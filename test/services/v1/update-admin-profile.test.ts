import app from '../../../src/app';

describe('\'v1/update-admin-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/update-admin-profile');
    expect(service).toBeTruthy();
  });
});
