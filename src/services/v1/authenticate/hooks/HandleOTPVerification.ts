
import { HookContext, Params } from '@feathersjs/feathers';
import { Actions, Authenticate_PATCH, AuthStrategies } from '../interfaces/AuthenticationInterface';
import { OTP_query } from '../../../../db_services/v1/otp/interfaces/OtpInterfaces';
import { VerifyOtpInterface } from '../../../../utils/AuthHelper/AuthHelperInterface';
import { OTPHelper } from '../../../../utils/AuthHelper/OTPHelper';
import { AuthHelper } from '../../../../utils/AuthHelper/AuthHelper';
import { BadRequest } from '@feathersjs/errors';
import { User_GET } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import handleForgotPasswordVerification from '../utils/handleForgotPasswordVerification';

/**
 * Handle verification with OTP for different types of action
 * with email and phone.
 */
const HandleOTPVerification = () => async (context: HookContext) => {
    const { phone, email, action, otp, role } = context.data as Authenticate_PATCH;

    const otpSearchQuery: OTP_query = {
        phone: AuthStrategies.PHONE_OTP ? phone : undefined,
        email: AuthStrategies.EMAIL_OTP ? email : undefined,
        purpose: action,
        $sort: { createdAt: -1 },
        $limit: 1,
        otp,
    };

    const params: Params = {
        ...context.params,
        query: {
            ...context.params.query,
            role,
        },
    };

    const otpVerificationData: VerifyOtpInterface = await OTPHelper.verifyOtp(otpSearchQuery).catch((e) => {
        throw e;
    });
    const { storedData } = otpVerificationData;

    if (storedData) {
        switch (action) {
            case Actions.VERIFICATION:
                const userData = params.user as User_GET;
                context.result = await AuthHelper.updateUserAndAuthenticate(
                    userData._id.toString(),
                    {
                        email: AuthStrategies.EMAIL_OTP ? email : undefined,
                        phone: AuthStrategies.PHONE_OTP ? phone : undefined,
                    },
                    params,
                ).catch((e) => {
                    throw e;
                });
                break;
            case Actions.FORGOT_PASSWORD:
                context.result = await handleForgotPasswordVerification(context);
                break;

            // case Actions.RESET_PASSWORD:
            // context.result = await AuthHelper.
            case Actions.LOGIN:
                if (phone) {
                    const userData = await AuthHelper.checkUserPhone(phone, params);
                    if (userData) {
                        context.result = await AuthHelper.generateAccessToken(userData);
                    } else {
                        context.result = {
                            registrationToken: storedData.token,
                        };
                    }
                } else {
                    throw new BadRequest('Phone number is required');
                }
                break;
            case Actions.SIGNUP:
                context.result = {
                    registrationToken: storedData.token,
                };
                break;
            default:
                throw new BadRequest('Invalid Action.');
        }

        if ([Actions.VERIFICATION, Actions.FORGOT_PASSWORD].includes(action)) {
            await OTPHelper.removeOtp(storedData._id.toString());
        }
    } else {
        throw new BadRequest('Invalid Operation.');
    }

    return context;
};

export default HandleOTPVerification;
