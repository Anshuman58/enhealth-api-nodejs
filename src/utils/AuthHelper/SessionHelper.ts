import { Service } from 'feathers-mongoose';
import { ServiceAddons } from '@feathersjs/feathers';
import { Application as ApplicationCore } from '../../declarations';
import { userSessionPath } from '../../service_endpoints/services';
import {
    SessionStatus,
    UserSession_FIND,
    UserSession_PATCH,
    UserSession_POST,
    UserSession_QUERY,
} from '../../db_services/v1/user-session/Interface/UserSessionInterface';
import { User_GET } from '../../db_services/v1/user/interfaces/UserInterfaces';

/**
 * This class implements all the utility functions
 * for managing user sessions.
 */
export class SessionHelper {
    private static _sessionService: Service & ServiceAddons<any>;

    /**
     * Initialize session service.
     *
     * @param app - The application object from feathers js.
     */
    static initializeSession(app: ApplicationCore): void {
        SessionHelper._sessionService = app.service(userSessionPath);
    }

    /**
     * Check if session exists with the same device id
     * if exists end the previous session.
     * @param deviceId - device id .
     */
    static async checkSessionExists(deviceId: string): Promise<void> {
        const userSessionQuery: UserSession_QUERY = {
            deviceId,
            status: SessionStatus.ACTIVE,
            $limit: 1,
            $sort: { createdAt: -1 },
        };
        const sessionExists = await SessionHelper._sessionService
            ._find({
                query: userSessionQuery,
            })
            .then((res: UserSession_FIND) => (res.total ? res.data[0] : null));


        if (sessionExists) {
            const dataTobePatched: UserSession_PATCH = {
                status: SessionStatus.ENDED,
                sessionEndedOn: new Date(),
            };
            await SessionHelper._sessionService._patch(sessionExists._id.toString(), dataTobePatched);
        }
    }

    /**
     * Create a new session for the user.
     * @param sessionData - session object.
     */
    static async createNewSession(sessionData: UserSession_POST): Promise<void> {
        await SessionHelper._sessionService._create(sessionData);
    }

    /**
     * Verify if thea access token exists with a user session or not.
     * @param accessToken - Access token to be verified.
     * @param user - user data.
     * @returns True or false.
     */
    static async verifyAccessTokenWithSession(accessToken: string, user: User_GET): Promise<boolean> {
        const sessionQuery: UserSession_QUERY = {
            accessToken,
            user: user._id,
            status: SessionStatus.ACTIVE,
            $limit: 1,
        };
        return await SessionHelper._sessionService
            ._find({
                query: sessionQuery,
            })
            .then((res: UserSession_FIND) => !!res.total);
    }
}
