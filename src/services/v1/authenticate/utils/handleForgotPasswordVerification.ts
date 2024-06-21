import { HookContext } from '@feathersjs/feathers';
import { Actions, Authenticate_PATCH, AuthStrategies } from '../interfaces/AuthenticationInterface';
import { AuthHelper } from '../../../../utils/AuthHelper/AuthHelper';
import { BadRequest } from '@feathersjs/errors';
import { User_GET } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import { otpPath } from '../../../../service_endpoints/services';
import moment from 'moment/moment';
import { OTPHelper } from '../../../../utils/AuthHelper/OTPHelper';

/**
 * Handle forgot password verification with phone and email.
 * @param context - Feathers context object
 * @returns a password reset token that is temporary.
 */
const handleForgotPasswordVerification = async (context: HookContext): Promise<{ passwordResetToken: string }> => {
    const { params, app } = context;

    const { strategy, email, phone } = context.data as Authenticate_PATCH;

    let userData: User_GET | null = null;
    switch (strategy) {
        case AuthStrategies.EMAIL_OTP:
            if (email) {
                userData = await AuthHelper.checkUserEmail(email, params);
                if (!userData) throw new BadRequest('User not found.');
            }
            break;
        case AuthStrategies.PHONE_OTP:
            if (phone) {
                userData = await AuthHelper.checkUserPhone(phone, params);
                if (!userData) throw new BadRequest('User not found.');
            }
            break;
        default:
            throw new BadRequest('Invalid operation.');
    }

    if (userData) {
        const passwordResetToken = await AuthHelper.generateAccessToken(userData, true)
            .then((res) => res.accessToken)
            .catch((e) => {
                throw e;
            });

        // await app.service(otpPath)._create({
        //     token: passwordResetToken,
        //     purpose: Actions.RESET_PASSWORD,
        // });

        return {
            passwordResetToken,
        };
    } else {
        throw new BadRequest('User not found.');
    }
};

export default handleForgotPasswordVerification;
