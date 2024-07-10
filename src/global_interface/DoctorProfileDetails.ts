import { Types } from 'mongoose';
import { UploadMediaAttachment } from './UploadMediaAttachment';
import { UserRole, UserStatus } from '../db_services/v1/user/interfaces/UserInterfaces';
import { Address } from './Address';
import {
    DoctorAward,
    DoctorEducation,
    DoctorExperience,
    MedicalLicense,
} from '../db_services/v1/profile/doctor-profile/interfaces/DoctorProfileInterfaces';

export interface DoctorProfileDetails {
    _id: Types.ObjectId;
    name: string;
    email?: string;
    avatar?: UploadMediaAttachment;
    gender?: number;
    dob?: Date;
    phone?: string;
    role: UserRole;
    status: UserStatus;
    createdAt: Date;
    updatedAt: Date;
    profile?: {
        _id?: Types.ObjectId;
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
        consultationFee?: {
            onlineConsultationFee?: number;
            clinicConsultationFee?: number;
            homeConsultationFee?: number;
        };
    };
}
