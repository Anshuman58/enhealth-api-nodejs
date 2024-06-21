// Initializes the `../db_services/v1/consultation-chat` service on path `/v1/consultation-chat`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { ConsultationChat } from './consultation-chat.class';
import createModel from './consultation-chat.model';
import hooks from './consultation-chat.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/consultation-chat': ConsultationChat & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/consultation-chat', new ConsultationChat(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/consultation-chat');

    service.hooks(hooks);
}
