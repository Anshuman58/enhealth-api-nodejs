import app from '../../../../../src/app';

describe('\'../db_services/v1/consultation-booking\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/consultation-booking');
    expect(service).toBeTruthy();
  });
});
