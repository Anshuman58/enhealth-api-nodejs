// Initializes the `../db_services/v1/user-session` service on path `/v1/user-session`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { UserSession } from './user-session.class';
import createModel from './user-session.model';
import hooks from './user-session.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/user-session': UserSession & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/user-session', new UserSession(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/user-session');

    service.hooks(hooks);
}
