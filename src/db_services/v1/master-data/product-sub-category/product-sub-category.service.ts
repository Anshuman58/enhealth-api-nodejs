// Initializes the `../db_services/v1/master-data/product-sub-category` service on path `/v1/master-data/product-sub-category`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { ProductSubCategory } from './product-sub-category.class';
import createModel from './product-sub-category.model';
import hooks from './product-sub-category.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/product-sub-category': ProductSubCategory & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/master-data/product-sub-category', new ProductSubCategory(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/product-sub-category');

    service.hooks(hooks);
}
