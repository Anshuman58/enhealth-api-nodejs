import { ServiceAddons } from '@feathersjs/feathers';
import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication';
import { LocalStrategy } from '@feathersjs/authentication-local';
import { expressOauth } from '@feathersjs/authentication-oauth';
import * as local from '@feathersjs/authentication-local';


import { Application } from './declarations';
import { NextFunction, Request, Response } from 'express';

declare module './declarations' {
    interface ServiceTypes {
        authentication: AuthenticationService & ServiceAddons<any>;
    }
}

const { protect } = local.hooks;

export default function (app: Application): void {
    const authentication = new AuthenticationService(app);

    authentication.register('jwt', new JWTStrategy());
    authentication.register('local', new LocalStrategy());

    app.use(
        '/authentication',
        function (req: Request, res: Response, next: NextFunction) {
            req.body.ip = req.header('x-forwarded-for') || req.ip;
            next();
        },
        authentication,
    );

    const service = app.service('authentication');

    service.hooks({
        after: {
            create: [protect('authentication', 'payload', 'user.createdAt', 'user.updatedAt', 'user.__v')],
        },
    });

    app.configure(expressOauth());
}
