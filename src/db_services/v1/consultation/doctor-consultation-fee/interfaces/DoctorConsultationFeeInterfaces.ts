import { Types } from "mongoose";
import { DoctorProfile_GET } from "../../../profile/doctor-profile/interfaces/DoctorProfileInterfaces";
import { EntityStatus } from "../../../../../constants/EntityStatus";

export interface DoctorConsultationFee_GET {
    _id: Types.ObjectId;
    doctorProfile: Types.ObjectId | DoctorProfile_GET;
    onlineConsultationFee?: number;
    clinicConsultationFee?: number;
    homeConsultationFee?: number;
    status: EntityStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface DoctorConsultationFee_FIND {
    total: number;
    limit: number;
    skip: number;
    data: Array<DoctorConsultationFee_GET>;
}

export interface DoctorConsultationFee_POST {
    doctorProfile: Types.ObjectId;
    onlineConsultationFee?: number;
    clinicConsultationFee?: number;
    homeConsultationFee?: number;
    status?: EntityStatus;
}

export interface DoctorConsultationFee_PATCH {
    onlineConsultationFee?: number;
    clinicConsultationFee?: number;
    homeConsultationFee?: number;
    status?: EntityStatus;
}

export interface DoctorConsultationFee_QUERY {
    doctorProfile?: any;
    onlineConsultationFee?: any;
    clinicConsultationFee?: any;
    homeConsultationFee?: any;
    status?: any;
}
