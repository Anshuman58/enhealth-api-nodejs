import app from '../../../../../src/app';

describe('\'../db_services/v1/resume-sub-category\' service', () => {
  it('registered the service', () => {
    const service = app.service('../db_services/v1/resume-sub-category');
    expect(service).toBeTruthy();
  });
});
