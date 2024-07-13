import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';

export interface Surgeon_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Surgeon_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Surgeon_GET>;
}

export interface Surgeon_POST {
    createdBy: Types.ObjectId;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    status: EntityStatus;
}

export interface Surgeon_PATCH {
    name?: string;
    attachments?: Array<UploadMediaAttachment>;
    status?: EntityStatus;
}

export interface Surgeon_QUERY {
    _id?: any;
    name?: any;
    status?: any;
}
