import app from '../../../src/app';

describe('\'v1/resume-suggestions-with-ai\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/resume-suggestions-with-ai');
    expect(service).toBeTruthy();
  });
});
