import { UploadMediaAttachment } from '../../../../../global_interface/UploadMediaAttachment';
import { Address } from '../../../../../global_interface/Address';
import {
    DoctorAward,
    DoctorEducation,
    DoctorExperience,
    MedicalLicense,
} from '../../../../../db_services/v1/profile/doctor-profile/interfaces/DoctorProfileInterfaces';

export interface UpdateDoctorProfileRequest {
    name?: string;
    email?: string;
    avatar?: UploadMediaAttachment;
    gender?: number;
    dob?: Date;
    phone?: string;
    password?: string;
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
    metadata?: string;
    termsAndConditionAccepted?: boolean;
    consultationFee?: {
        onlineConsultationFee?: number;
        clinicConsultationFee?: number;
        homeConsultationFee?: number;
    };
}
