import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';
import { Types } from 'mongoose';
import { User_GET } from '../../../user/interfaces/UserInterfaces';
import { Address } from '../../../../../global_interface/Address'
import { EntityStatus } from '../../../../../constants/EntityStatus';

export interface DoctorExperience {
    from: number;
    to: number;
    role: string;
    hospital: string;
}

export interface DoctorEducation {
    school: string;
    qualification: string;
    year: number;
}

export interface DoctorAward {
    name: string;
    year: number;
    attachment?: UploadMediaAttachment;
}

export interface MedicalLicense {
    licenseAuthority: string;
    licenseNumber: string;
    licenseExpiration: Date;
    attachment: UploadMediaAttachment;
}

export interface DoctorProfile_GET {
    _id: Types.ObjectId;
    user: Types.ObjectId | User_GET;
    description?: string;
    address: Address;
    specialities: Array<string>;
    symptomSpecializations: Array<string>;
    surgeonSpecializations?: Array<string>;
    languages: Array<string>;
    hospitalName: string;
    experiences?: Array<DoctorExperience>;
    educations?: Array<DoctorEducation>;
    idProof?: Array<UploadMediaAttachment>;
    awards?: Array<DoctorAward>;
    registrationCertificate?: UploadMediaAttachment;
    medicalLicense?: MedicalLicense;
    clinicalEstablishmentCertificate?: UploadMediaAttachment;
    workPlaceId?: UploadMediaAttachment;
    status: EntityStatus;
    metadata?: string;
    averageRating: number;
    totalRatingCount: number;
    termsAndConditionAccepted?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface DoctorProfile_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<DoctorProfile_GET>;
}

export interface DoctorProfile_POST {
    user: Types.ObjectId;
    description?: string;
    address?: Address;
    specialities?: Array<string>;
    symptomSpecializations?: Array<string>;
    surgeonSpecializations?: Array<string>;
    languages?: Array<string>;
    hospitalName?: string;
    experiences?: Array<DoctorExperience>;
    educations?: Array<DoctorEducation>;
    idProof?: Array<UploadMediaAttachment>;
    awards?: Array<DoctorAward>;
    registrationCertificate?: UploadMediaAttachment;
    medicalLicense?: MedicalLicense;
    clinicalEstablishmentCertificate?: UploadMediaAttachment;
    workPlaceId?: UploadMediaAttachment;
    status?: EntityStatus;
    metadata?: string;
}

export interface DoctorProfile_PATCH {
    description?: string;
    address?: Address;
    specialities?: Array<string>;
    symptomSpecializations?: Array<string>;
    surgeonSpecializations?: Array<string>;
    languages?: Array<string>;
    hospitalName?: string;
    experiences?: Array<DoctorExperience>;
    educations?: Array<DoctorEducation>;
    idProof?: Array<UploadMediaAttachment>;
    awards?: Array<DoctorAward>;
    registrationCertificate?: UploadMediaAttachment;
    medicalLicense?: MedicalLicense;
    clinicalEstablishmentCertificate?: UploadMediaAttachment;
    workPlaceId?: UploadMediaAttachment;
    status?: EntityStatus;
    metadata?: string;
    averageRating?: number;
    totalRatingCount?: number;
    termsAndConditionAccepted?: boolean;
}

export interface DoctorProfile_QUERY {
    _id?: any;
    user?: any;
    status?: any;
    specialities?: any;
    symptomSpecializations?: any;
    surgeonSpecializations?: any;
    languages?: any;
    metadata?: any;
    averageRating?: any;
    totalRatingCount?: any;
}
