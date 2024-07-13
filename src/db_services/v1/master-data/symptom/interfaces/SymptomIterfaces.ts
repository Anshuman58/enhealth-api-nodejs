import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';

export interface Symptom_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    hidden: boolean;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Symptom_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Symptom_GET>;
}

export interface Symptom_POST {
    createdBy: Types.ObjectId;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    status: EntityStatus;
    hidden?: boolean;
}

export interface Symptom_PATCH {
    name?: string;
    attachments?: Array<UploadMediaAttachment>;
    status?: EntityStatus;
    hidden?: boolean;
}

export interface Symptom_QUERY {
    _id?: any;
    name?: any;
    status?: any;
    hidden?: any;
}
