import app from '../../../src/app';

describe("'v1/user-session' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/user-session');
        expect(service).toBeTruthy();
    });
});
