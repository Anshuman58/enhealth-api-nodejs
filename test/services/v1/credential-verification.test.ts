import app from '../../../src/app';

describe("'v1/credential-verification' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/credential-verification');
        expect(service).toBeTruthy();
    });
});
