import app from '../../../src/app';

describe('\'v1/upload\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/upload');
    expect(service).toBeTruthy();
  });
});
