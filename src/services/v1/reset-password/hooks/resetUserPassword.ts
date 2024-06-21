import { HookContext } from '@feathersjs/feathers';
import { Actions, decodedValue } from '../../authenticate/interfaces/AuthenticationInterface';
import { BadRequest, NotAuthenticated } from '@feathersjs/errors';
import jwt_decode from 'jwt-decode';
import { UserStatus } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import { userPath } from '../../../../service_endpoints/services';

const resetUserPassword = () => async (context: HookContext) => {
    const {
        data: { action, password },
        params,
        app,
    } = context;

    /*need to use the otp endpoint api for verification*/

    if (action !== Actions.RESET_PASSWORD) throw new BadRequest('Invalid Request');

    if (!password) throw new BadRequest('password is required');

    if (!params.headers || !params.headers.authorization)
        throw new NotAuthenticated('AccessToken is required in header!');

    const accessToken: string = params.headers.authorization.split(' ')[1];

    const decodedValue: decodedValue = jwt_decode(accessToken);

    if (!decodedValue) throw new BadRequest('Invalid Access Token');

    const { exp, sub } = decodedValue;

    const userData = await app
        .service(userPath)
        ._get(sub.toString(), {
            provider: 'server',
            query: {
                status: { $ne: UserStatus.REMOVED },
            },
        })
        .catch(() => {
            throw new NotAuthenticated('Invalid AccessToken');
        });

    if (exp) {
        if (exp * 1000 > Date.now()) {
            await app
                .service(userPath)
                .patch(
                    sub.toString(),
                    {
                        password: password,
                    },
                    {
                        provider: 'server',
                    },
                )
                .catch(() => {
                    throw new NotAuthenticated('Something went wrong');
                });

            context.result = {
                success: true,
            };
        } else {
            throw new BadRequest('Forgot Password operation timed out.');
        }
    } else {
        //create a new AccessToken using userId
        throw new NotAuthenticated('Invalid AccessToken');
    }

    return context;
};

export default resetUserPassword;
