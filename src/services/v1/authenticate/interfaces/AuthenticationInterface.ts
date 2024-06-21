/**
 * Created By Soumya(soumya\@smartters.in) on 10/17/2022 at 1:22 PM.
 */

import { UserRole } from '../../../../db_services/v1/user/interfaces/UserInterfaces';
import { Types } from 'mongoose';

export enum AuthStrategies {
    LOCAL = 'local',
    JWT = 'jwt',
    PHONE_OTP = 'phoneOtp',
    EMAIL_OTP = 'emailOtp',
    GOOGLE = 'google',
    LINKEDIN = 'linkedin',
}

export enum Actions {
    LOGIN = 'login',
    SIGNUP = 'signup',
    VERIFICATION = 'verification',
    FORGOT_PASSWORD = 'forgotPassword',
    RESET_PASSWORD = 'resetPassword',
}

export interface Authenticate_POST {
    strategy: AuthStrategies;
    action?: Actions;
    phone?: string;
    email?: string;
    password?: string;
    accessToken?: string;
    accessTokenSecret?: string;
    role: UserRole;
}

export interface Authenticate_PATCH {
    strategy: AuthStrategies;
    action: Actions;
    otp: string;
    phone?: string;
    email?: string;
    role?: UserRole;
}

export interface UpdateUser {
    phone?: string;
    email?: string;
}

export interface decodedValue {
    iat: number;
    exp: number;
    aud: string;
    iss: string;
    sub: Types.ObjectId | string;
    jti: string;
    type?: string;
}
