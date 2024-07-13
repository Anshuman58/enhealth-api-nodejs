import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';

export enum LanguageStatus {
    ACTIVE = 1,
    DELETED = -1,
}

export interface Language_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    status: LanguageStatus;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Language_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Language_GET>;
}

export interface Language_POST {
    createdBy: Types.ObjectId | User_GET;
    name: string;
}

export interface Language_PATCH {
    status?: LanguageStatus;
    name?: string;
}

export interface Language_QUERY {
    _id?: any;
    name?: any;
    status?: any;
}
