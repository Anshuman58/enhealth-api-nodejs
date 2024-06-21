import { Types } from 'mongoose';

export enum SessionStatus {
    ACTIVE = 1,
    ENDED = -1,
}

export enum DeviceType {
    ANDROID = 1,
    IOS = 2,
    WEB = 3,
}

export interface UserSession_GET {
    _id: Types.ObjectId;
    user: Types.ObjectId | any;
    deviceId: string;
    deviceType: DeviceType;
    deviceName: string;
    fcmId?: string;
    accessToken: string;
    ip: string;
    sessionEndedOn?: Date;
    status: SessionStatus;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface UserSession_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<UserSession_GET>;
}

export interface UserSession_POST {
    user: Types.ObjectId;
    deviceId: string;
    deviceType: DeviceType;
    deviceName: string;
    fcmId?: string;
    accessToken: string;
    ip: string;
}

export interface UserSession_PATCH {
    sessionEndedOn?: Date;
    status: SessionStatus;
}

export interface UserSession_QUERY {
    user?: Types.ObjectId;
    deviceId?: string;
    accessToken?: string;
    status?: SessionStatus;
    $limit?: number;
    $sort?: object;
}
