import app from '../../../src/app';

describe('\'v1/authenticate\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/authenticate');
    expect(service).toBeTruthy();
  });
});
