// Initializes the `../db_services/v1/consultation/doctor-consultation-fee` service on path `/v1/consultation/doctor-consultation-fee`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../../declarations';
import { DoctorConsultationFee } from './doctor-consultation-fee.class';
import createModel from './doctor-consultation-fee.model';
import hooks from './doctor-consultation-fee.hooks';
import { DoctorConsultationFeeDbOperations } from './utils/DoctorConsultationFeeDbOperations';

// Add this service to the service type index
declare module '../../../../declarations' {
    interface ServiceTypes {
        'v1/consultation/doctor-consultation-fee': DoctorConsultationFee & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        Model: createModel(app),
        paginate: app.get('paginate'),
        whitelist: ['$populate', '$regex', '$options'],
    };

    // Initialize our service with any options it requires
    app.use('/v1/consultation/doctor-consultation-fee', new DoctorConsultationFee(options, app));

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/consultation/doctor-consultation-fee');
    DoctorConsultationFeeDbOperations.initializeService(service);

    service.hooks(hooks);
}
