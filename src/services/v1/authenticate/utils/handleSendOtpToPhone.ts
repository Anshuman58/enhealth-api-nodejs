import { HookContext } from '@feathersjs/feathers';
import { Actions, Authenticate_POST } from '../interfaces/AuthenticationInterface';
import { AuthHelper } from '../../../../utils/AuthHelper/AuthHelper';
import { BadRequest } from '@feathersjs/errors';
import { User_GET } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import { OTPHelper } from '../../../../utils/AuthHelper/OTPHelper';

/**
 * Send OTP to phone based upon the action.
 * @param context - Feathers context object.
 *
 * @returns a success message if otp send is successful.
 */
const handleSendOtpToPhone = async (context: HookContext): Promise<{ message: string }> => {
    const { app, params } = context;

    const { action, phone, role } = context.data as Authenticate_POST;

    if (phone && action) {
        // Validate phone number.
        AuthHelper.validatePhoneNumber(phone);

        let userData: User_GET | null;
        // Verify action and validate accordingly.
        switch (action) {
            case Actions.LOGIN:
            case Actions.FORGOT_PASSWORD:
                userData = await AuthHelper.checkUserPhone(phone, {
                    ...params,
                    query: {
                        ...params.query,
                        role,
                    },
                });
                if (!userData && action === Actions.FORGOT_PASSWORD) {
                    throw new BadRequest('No account has been found with this phone number.');
                }
                break;
            default:
                throw new BadRequest('Invalid Operation from the client.');
        }

        // Get OTP.
        const otp = await OTPHelper.getOTP({
            phone,
            purpose: action,
            $sort: { createdAt: -1 },
            $limit: 1,
        }).catch((e: any) => {
            throw e;
        });

        // Send OTP to the user.
        return await OTPHelper.sendOtpToPhone(otp, phone).catch((e) => {
            throw e;
        });
    } else {
        throw new BadRequest('Phone number verification failure.');
    }
};

export default handleSendOtpToPhone;
