import app from '../../../src/app';

describe('\'v1/download-resume\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/download-resume');
    expect(service).toBeTruthy();
  });
});
