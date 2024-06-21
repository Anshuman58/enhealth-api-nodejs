import { HookContext } from '@feathersjs/feathers';
import { Actions, Authenticate_POST } from '../interfaces/AuthenticationInterface';
import { AuthHelper } from '../../../../utils/AuthHelper/AuthHelper';
import { BadRequest } from '@feathersjs/errors';
import { User_GET, UserRole } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import { OTPHelper } from '../../../../utils/AuthHelper/OTPHelper';

/**
 * Send OTP to email based upon the action.
 * @param context - Feathers context object.
 *
 * @returns a success message if otp send is successful.
 */
const handleSendOtpToEmail = async (context: HookContext): Promise<{ message: string }> => {
    const { app, params } = context;

    const { action, email, role } = context.data as Authenticate_POST;

    if (![UserRole.ADMIN, UserRole.USER].includes(role)) throw new BadRequest('Invalid login operation');

    if (email && action) {
        // Validate email address.
        AuthHelper.validateEmail(email);

        let userData: User_GET | null;
        // Verify action and validate accordingly.
        switch (action) {
            case Actions.VERIFICATION:
                userData = await AuthHelper.checkUserEmail(email, {
                    ...params,
                    query: {
                        ...params.query,
                        role,
                    },
                });
                if (userData) {
                    throw new BadRequest('Account already exists with this email address.');
                }
                break;
            case Actions.FORGOT_PASSWORD:
            case Actions.LOGIN:
                userData = await AuthHelper.checkUserEmail(email, {
                    ...params,
                    query: {
                        ...params.query,
                        role,
                    },
                });

                if (!userData) {
                    throw new BadRequest('No account has been found with this phone number.');
                }
                break;
            default:
                throw new BadRequest('Invalid Operation from the client.');
        }

        // Get OTP.
        const otp = await OTPHelper.getOTP({
            email,
            purpose: action,
            $sort: { createdAt: -1 },
            $limit: 1,
        }).catch((e: any) => {
            throw e;
        });

        // Send OTP to the user.
        return await OTPHelper.sendOtpToEmail(otp, email).catch((e) => {
            throw e;
        });
    } else {
        throw new BadRequest('Email verification failure.');
    }
};

export default handleSendOtpToEmail;
