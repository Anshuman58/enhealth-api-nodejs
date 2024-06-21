import app from '../../../src/app';

describe('\'v1/user-resume-management\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/user-resume-management');
    expect(service).toBeTruthy();
  });
});
