import app from '../../../../../src/app';

describe('\'../db_services/v1/newsletter\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/newsletter');
    expect(service).toBeTruthy();
  });
});
