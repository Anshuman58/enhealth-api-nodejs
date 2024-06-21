// Initializes the `v1/otp` service on path `/v1/otp`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Otp } from './otp.class';
import createModel from './otp.model';
import hooks from './otp.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/otp': Otp & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/otp', new Otp(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/otp');

    service.hooks(hooks);
}
