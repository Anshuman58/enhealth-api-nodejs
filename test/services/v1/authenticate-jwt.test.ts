import app from '../../../src/app';

describe("'v1/authenticate-jwt' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/authenticate-jwt');
        expect(service).toBeTruthy();
    });
});
