import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';
import { Surgeon_GET } from '../../surgeon/interfaces/SurgeonInterfaces';
import { Symptom_GET } from '../../symptom/interfaces/SymptomIterfaces';

export interface Speciality_GET {
    _id: Types.ObjectId;
    createdBy: Types.ObjectId | User_GET;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    surgeonIds?: Array<Types.ObjectId | Surgeon_GET>;
    symptomIds?: Array<Types.ObjectId | Symptom_GET>;
    surgeonNames?: Array<string>;
    symptomNames?: Array<string>;
    hidden: boolean;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface Speciality_FIND {
    total: number;
    skip: number;
    limit: number;
    data: Array<Symptom_GET>;
}

export interface Speciality_POST {
    createdBy: Types.ObjectId;
    name: string;
    attachments: Array<UploadMediaAttachment>;
    status: EntityStatus;
    surgeonIds?: Array<Types.ObjectId>;
    surgeonIdsData?: Array<Surgeon_GET>;
    symptomIds?: Array<Types.ObjectId>;
    symptomIdsData?: Array<Symptom_GET>;
    surgeonNames?: Array<string>;
    symptomNames?: Array<string>;
    hidden?: boolean;
}

export interface Speciality_PATCH {
    name?: string;
    attachments?: Array<UploadMediaAttachment>;
    status?: EntityStatus;
    surgeonIds?: Array<Types.ObjectId>;
    surgeonIdsData?: Array<Surgeon_GET>;
    symptomIds?: Array<Types.ObjectId>;
    symptomIdsData?: Array<Symptom_GET>;
    surgeonNames?: Array<string>;
    symptomNames?: Array<string>;
    hidden?: boolean;
}

export interface Speciality_QUERY {
    _id?: any;
    name?: any;
    status?: any;
    surgeonIds?: any;
    symptomIds?: any;
    surgeonNames?: any;
    symptomNames?: any;
    hidden?: any;
}
