/**
 * Created By Soumya(soumya\@smartters.in) on 2/23/2022 at 9:19 PM.
 */

import { Types } from 'mongoose';

/**
 * interfaces for OTP
 */
export interface OTP_GET {
    _id: Types.ObjectId;
    email?: string;
    phone?: string;
    otp: string;
    expireOn: Date;
    token?: string;
    purpose: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface OTP_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<OTP_GET>;
}

export interface OTP_POST {
    email?: string;
    phone?: string;
    otp: string;
    expireOn: Date;
    token?: string;
    purpose: string;
}

export interface OTP_query {
    phone?: string;
    email?: string;
    otp?: string;
    $sort: { createdAt: -1 };
    $limit: 1;
    purpose: string;
    token?: string;
}
