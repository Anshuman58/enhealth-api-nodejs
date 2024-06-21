import app from '../../../../../../src/app';

describe('\'../db_services/v1/master-data/product-sub-category\' service', () => {
  it('registered the service', () => {
    const service = app.service('v1/master-data/product-sub-category');
    expect(service).toBeTruthy();
  });
});
