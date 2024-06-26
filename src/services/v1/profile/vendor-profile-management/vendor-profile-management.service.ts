// Initializes the `v1/profile/vendor-profile-management` service on path `/v1/profile/vendor-profile-management`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { VendorProfileManagement } from './vendor-profile-management.class';
import hooks from './vendor-profile-management.hooks';

// Add this service to the service type index
declare module '../../../../declarations' {
  interface ServiceTypes {
    'v1/profile/vendor-profile-management': VendorProfileManagement & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/profile/vendor-profile-management', new VendorProfileManagement(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/profile/vendor-profile-management');

  service.hooks(hooks);
}
