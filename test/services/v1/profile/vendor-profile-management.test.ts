import app from '../../../../src/app';

describe('\'v1/profile/vendor-profile-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/profile/vendor-profile-management');
    expect(service).toBeTruthy();
  });
});
