import { HookContext } from '@feathersjs/feathers';
import { Authenticate_POST, AuthStrategies } from '../interfaces/AuthenticationInterface';
import handleLocalAndJWTAuthentication from '../utils/handleLocalAndJWTAuthentication';
import handleSocialMediaLogin from '../utils/handleSocialMediaLogin';
import { FeathersError } from '@feathersjs/errors';
import handleSendOtpToEmail from '../utils/handleSendOtpToEmail';
import handleJWTAuthentication from '../utils/handleJWTAuthentication';
import handleSendOtpToPhone from '../utils/handleSendOtpToPhone';

/**
 * Handle different types of authentication strategy.
 */
const HandleAuthentication = () => async (context: HookContext) => {
    const data = context.data as Authenticate_POST;

    const { strategy } = data;

    switch (strategy) {
        case AuthStrategies.LOCAL:
            context.result = await handleLocalAndJWTAuthentication(context).catch((e: FeathersError) => {
                throw e;
            });
            break;

        case AuthStrategies.JWT:
            context.result = await handleJWTAuthentication(context).catch((e: FeathersError) => {
                throw e;
            });
            break;

        case AuthStrategies.GOOGLE:
        case AuthStrategies.LINKEDIN:
            context.result = await handleSocialMediaLogin(context).catch((e: FeathersError) => {
                throw e;
            });
            break;
        case AuthStrategies.PHONE_OTP:
            context.result = await handleSendOtpToPhone(context).catch((e: FeathersError) => {
                throw e;
            });
            break;
        case AuthStrategies.EMAIL_OTP:
            context.result = await handleSendOtpToEmail(context).catch((e: FeathersError) => {
                throw e;
            });
    }

    return context;
};

export default HandleAuthentication;
