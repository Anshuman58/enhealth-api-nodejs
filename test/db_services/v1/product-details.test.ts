import app from '../../../../../src/app';

describe('\'../db_services/v1/product-details\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/product-details');
    expect(service).toBeTruthy();
  });
});
