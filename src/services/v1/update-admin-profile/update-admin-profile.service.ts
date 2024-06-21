// Initializes the `v1/update-admin-profile` service on path `/v1/update-admin-profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { UpdateAdminProfile } from './update-admin-profile.class';
import hooks from './update-admin-profile.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/update-admin-profile': UpdateAdminProfile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/update-admin-profile', new UpdateAdminProfile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/update-admin-profile');

  service.hooks(hooks);
}
