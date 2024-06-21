// Initializes the `v1/generate-agora-token` service on path `/v1/generate-agora-token`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { GenerateAgoraToken } from './generate-agora-token.class';
import hooks from './generate-agora-token.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/generate-agora-token': GenerateAgoraToken & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/generate-agora-token', new GenerateAgoraToken(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/generate-agora-token');

  service.hooks(hooks);
}
