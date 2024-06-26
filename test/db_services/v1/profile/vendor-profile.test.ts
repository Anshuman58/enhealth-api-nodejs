import app from '../../../../../../src/app';

describe('\'../db_services/v1/profile/vendor-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/profile/vendor-profile');
    expect(service).toBeTruthy();
  });
});
