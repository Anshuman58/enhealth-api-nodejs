// Initializes the `v1/update-user-profile` service on path `/v1/update-user-profile`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { UpdateUserProfile } from './update-user-profile.class';
import hooks from './update-user-profile.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/update-user-profile': UpdateUserProfile & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/update-user-profile', new UpdateUserProfile(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/update-user-profile');

  service.hooks(hooks);
}
