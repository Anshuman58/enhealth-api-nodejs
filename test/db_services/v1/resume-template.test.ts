import app from '../../../../../src/app';

describe('\'../db_services/v1/resume-template\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/resume-template');
    expect(service).toBeTruthy();
  });
});
