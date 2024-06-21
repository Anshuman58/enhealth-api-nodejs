import app from '../../../../../src/app';

describe('\'../db_services/v1/admin-permission\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/admin-permission');
    expect(service).toBeTruthy();
  });
});
