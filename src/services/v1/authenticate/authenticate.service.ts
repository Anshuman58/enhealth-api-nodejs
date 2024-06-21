// Initializes the `v1/authenticate` service on path `/v1/authenticate`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../../declarations';
import { Authenticate } from './authenticate.class';
import hooks from './authenticate.hooks';
import { NextFunction, Request, Response } from 'express';

// Add this service to the service type index
declare module '../../../declarations' {
    interface ServiceTypes {
        'v1/authenticate': Authenticate & ServiceAddons<any>;
    }
}

export default function (app: Application): void {
    const options = {
        paginate: app.get('paginate'),
    };

    // Initialize our service with any options it requires
    app.use(
        '/v1/authenticate',
        function (req: Request, res: Response, next: NextFunction) {
            req.body.ip = req.header('x-forwarded-for') || req.ip;
            req.body.deviceName = (req.headers['user-agent'] as string) || '';
            next();
        },
        new Authenticate(options, app),
    );

    // Get our initialized service so that we can register hooks
    const service = app.service('v1/authenticate');

    service.hooks(hooks);
}
