import app from '../../../../../../src/app';

describe('\'../db_services/v1/master-data/product-category\' service', () => {
  it('registered the service', () => {
    const service = app.service('master-data/v1/product-category');
    expect(service).toBeTruthy();
  });
});
