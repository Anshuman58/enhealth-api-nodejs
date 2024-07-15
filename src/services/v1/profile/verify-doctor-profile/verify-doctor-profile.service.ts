// Initializes the `v1/profile/verify-doctor-profile` service on path `/v1/profile/verify-doctor-profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { VerifyDoctorProfile } from './verify-doctor-profile.class';
import hooks from './verify-doctor-profile.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/profile/verify-doctor-profile': VerifyDoctorProfile & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/profile/verify-doctor-profile', new VerifyDoctorProfile(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/profile/verify-doctor-profile');

    service.hooks(hooks);
}
