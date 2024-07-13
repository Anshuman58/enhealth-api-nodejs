// Initializes the `../db_services/v1/master-data/surgeon` service on path `/v1/master-data/surgeon`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Surgeon } from './surgeon.class';
import createModel from './surgeon.model';
import hooks from './surgeon.hooks';
import { SurgeonDbOperations } from './utils/SurgeonDbOperations';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/surgeon': Surgeon & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options', '$text', '$search'],
        multi: true,
    };

    // Initialize our service with any options it requires
    app.use('/v1/master-data/surgeon', new Surgeon(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/surgeon');
    SurgeonDbOperations.initializeService(service);

    service.hooks(hooks);
}
