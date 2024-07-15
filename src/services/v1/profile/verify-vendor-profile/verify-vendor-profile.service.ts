// Initializes the `v1/profile/verify-vendor-profile` service on path `/v1/profile/verify-vendor-profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { VerifyVendorProfile } from './verify-vendor-profile.class';
import hooks from './verify-vendor-profile.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/profile/verify-vendor-profile': VerifyVendorProfile & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use('/v1/profile/verify-vendor-profile', new VerifyVendorProfile(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/profile/verify-vendor-profile');

    service.hooks(hooks);
}
