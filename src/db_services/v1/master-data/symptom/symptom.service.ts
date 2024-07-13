// Initializes the `../db_services/v1/master-data/symptom` service on path `/v1/master-data/symptom`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Symptom } from './symptom.class';
import createModel from './symptom.model';
import hooks from './symptom.hooks';
import { SymptomDbOperations } from './utils/SymptomDbOperations';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/symptom': Symptom & ServiceAddons<any>;
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
    app.use('/v1/master-data/symptom', new Symptom(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/symptom');
    SymptomDbOperations.initializeService(service);

    service.hooks(hooks);
}
