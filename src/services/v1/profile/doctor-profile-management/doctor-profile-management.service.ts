// Initializes the `v1/profile/doctor-profile-management` service on path `/v1/profile/doctor-profile-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { DoctorProfileManagement } from './doctor-profile-management.class';
import hooks from './doctor-profile-management.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/profile/doctor-profile-management': DoctorProfileManagement & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/profile/doctor-profile-management', new DoctorProfileManagement(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/profile/doctor-profile-management');

    service.hooks(hooks);
}
