import app from '../../../src/app';

describe('\'v1/doctor-profile\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/doctor-profile');
    expect(service).toBeTruthy();
  });
});
