import app from '../../../../../src/app';

describe('\'../db_services/v1/consultation-chat\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/consultation-chat');
    expect(service).toBeTruthy();
  });
});
