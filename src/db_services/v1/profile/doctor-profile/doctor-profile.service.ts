// Initializes the `v1/doctor-profile` service on path `/v1/doctor-profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { DoctorProfile } from './doctor-profile.class';
import createModel from './doctor-profile.model';
import hooks from './doctor-profile.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/profile/doctor-profile': DoctorProfile & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/profile/doctor-profile', new DoctorProfile(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/profile/doctor-profile');
    // DoctorProfileDbOperations.initializeService(service);

    service.hooks(hooks);
}
