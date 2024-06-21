import { HookContext } from '@feathersjs/feathers';
import { SessionHelper } from '../utils/AuthHelper/SessionHelper';
import { UserSession_POST } from '../db_services/v1/user-session/Interface/UserSessionInterface';
import { AuthenticationLoginResponse } from '../services/v1/authenticate/interfaces/AuthenticationLoginResponse';

/**
 * Check and Create user session for the authorized user.
 */
const CreateUserSession = () => async (context: HookContext) => {
    const data = context.data as any;
    const result = context.result as AuthenticationLoginResponse;

    // console.log(result);
    const { accessToken, user } = result;

    if (accessToken && user) {
        const { deviceId, deviceType, fcmId, ip, deviceName } = data;

        if (deviceId && deviceType && ip && deviceName) {
            // check user session.
            await SessionHelper.checkSessionExists(deviceId);

            // create new user session.
            const sessionData: UserSession_POST = {
                deviceId,
                deviceType,
                ip,
                fcmId,
                user: user._id,
                accessToken,
                deviceName,
            };
            await SessionHelper.createNewSession(sessionData);
        }
    }
};

export default CreateUserSession;
