// Initializes the `../db_services/v1/master-data/language` service on path `/v1/master-data/language`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { Language } from './language.class';
import createModel from './language.model';
import hooks from './language.hooks';
import { LanguageDbOperations } from './utils/LanguageDbOperations';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/master-data/language': Language & ServiceAddons<any>;
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
    app.use('/v1/master-data/language', new Language(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/master-data/language');
    LanguageDbOperations.initializeService(service);

    service.hooks(hooks);
}
