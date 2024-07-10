import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';
import { Address } from '../../../../../global_interface/Address';

export enum VendorProfileType {
    WHOLESALE = 1,
    RETAIL = 2,
}

export interface VendorProfile_GET {
    _id: Types.ObjectId;
    user: Types.ObjectId | User_GET;
    drugLicense?: UploadMediaAttachment;
    wholesaleLicense?: UploadMediaAttachment;
    ownerIdProof?: UploadMediaAttachment;
    businessIdProof?: UploadMediaAttachment;
    addressProof?: Array<UploadMediaAttachment>;
    attachments?: Array<UploadMediaAttachment>;
    address?: Address;
    status: EntityStatus;
    averageRating: number;
    totalRatingCount: number;
    termsAndConditionAccepted?: boolean;
    bookingCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface VendorProfile_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<VendorProfile_GET>;
}

export interface VendorProfile_POST {
    user: Types.ObjectId;
    drugLicense?: UploadMediaAttachment;
    wholesaleLicense?: UploadMediaAttachment;
    ownerIdProof?: UploadMediaAttachment;
    businessIdProof?: UploadMediaAttachment;
    addressProof?: Array<UploadMediaAttachment>;
    attachments?: Array<UploadMediaAttachment>;
    address?: Address;
}

export interface VendorProfile_PATCH {
    drugLicenseType?: string;
    drugLicense?: UploadMediaAttachment;
    wholesaleLicense?: UploadMediaAttachment;
    ownerIdProof?: UploadMediaAttachment;
    businessIdProof?: UploadMediaAttachment;
    addressProof?: Array<UploadMediaAttachment>;
    attachments?: Array<UploadMediaAttachment>;
    address?: Address;
    status?: EntityStatus;
    averageRating?: number;
    totalRatingCount?: number;
    bookingCount?: number;
    termsAndConditionAccepted?: boolean;
}

export interface VendorProfile_QUERY {
    _id?: any;
    user?: any;
    status?: any;
    averageRating?: any;
    totalRatingCount?: any;
    bookingCount?: any;
}
