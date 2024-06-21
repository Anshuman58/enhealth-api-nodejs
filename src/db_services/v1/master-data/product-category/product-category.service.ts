// Initializes the `../db_services/v1/master-data/product-category` service on path `/master-data/v1/product-category`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { ProductCategory } from './product-category.class';
import createModel from './product-category.model';
import hooks from './product-category.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/product-category': ProductCategory & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/master-data/product-category', new ProductCategory(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/product-category');

    service.hooks(hooks);
}
