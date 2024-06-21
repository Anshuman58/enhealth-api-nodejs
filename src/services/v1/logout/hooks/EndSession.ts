import { HookContext } from '@feathersjs/feathers';
import { NotAuthenticated } from '@feathersjs/errors';
import { SessionQuery } from '../Interface/LogoutInterface';
import { userSessionPath } from '../../../../service_endpoints/services';
import {
    SessionStatus,
    UserSession_FIND,
} from '../../../../db_services/v1/user-session/Interface/UserSessionInterface';

const EndSession = () => async (context: HookContext) => {
    const { params, app } = context;

    if (!params.headers) throw new NotAuthenticated();

    const { authentication } = params;

    if (authentication) {
        const { accessToken } = authentication;

        const sessionQuery: SessionQuery = {
            accessToken,
            status: 1,
            $limit: 1,
        };

        const sessionService = app.service(userSessionPath);

        const sessionData = await sessionService
            ._find({
                query: sessionQuery,
            })
            .then((res: UserSession_FIND) => (res.total ? res.data[0] : null));

        if (sessionData) {
            const { _id: sessionId } = sessionData;

            await sessionService._patch(sessionId.toString(), {
                status: SessionStatus.ENDED,
                sessionEndedOn: new Date(),
            });
        }

        context.result = {
            message: 'Logout Successful',
        };
    }
};

export default EndSession;
