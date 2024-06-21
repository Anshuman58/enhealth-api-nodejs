import { User_GET } from '../../db_services/v1/user/interfaces/UserInterfaces';
import { OTP_GET } from '../../db_services/v1/otp/interfaces/OtpInterfaces';

/**
 * Interfaces related with AuthHelper class.
 */
export interface LoginInterface {
    accessToken: string;
    user: User_GET;
}

export interface VerifyOtpInterface {
    message: string;
    storedData?: OTP_GET;
}
