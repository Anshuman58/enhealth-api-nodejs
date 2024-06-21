import app from '../../../src/app';

describe("'v1/country' service", () => {
    it('registered the service', () => {
        const service = app.service('v1/country');
        expect(service).toBeTruthy();
    });
});
