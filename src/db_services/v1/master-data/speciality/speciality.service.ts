// Initializes the `../db_services/v1/master-data/speciality` service on path `/v1/master-data/speciality`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Speciality } from './speciality.class';
import createModel from './speciality.model';
import hooks from './speciality.hooks';
import { SpecialityDbOperations } from './utils/SpecialityDbOperations';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/speciality': Speciality & ServiceAddons<any>;
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
    app.use('/v1/master-data/speciality', new Speciality(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/speciality');
    SpecialityDbOperations.initializeService(service);

    service.hooks(hooks);
}
