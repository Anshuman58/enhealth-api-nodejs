import app from '../../../../../src/app';

describe('\'../db_services/v1/user-resume\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/user-resume');
    expect(service).toBeTruthy();
  });
});
