// Initializes the `../db_services/v1/consultation-booking` service on path `/v1/consultation-booking`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { ConsultationBooking } from './consultation-booking.class';
import createModel from './consultation-booking.model';
import hooks from './consultation-booking.hooks';

// Add this service to the service type index
declare module '../../../declarations' {
  interface ServiceTypes {
    'v1/consultation-booking': ConsultationBooking & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/v1/consultation-booking', new ConsultationBooking(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('v1/consultation-booking');

  service.hooks(hooks);
}
