import { Types } from 'mongoose';

export interface ConsultationBooking_Create {
    doctor: Types.ObjectId;
    vendor: Types.ObjectId;
    patient: {
        name: string;
        age: number;
        gender: patientGender;
        phone: string;
        complaint: string;
    };
    status: consultationBookingStatus;
}

export enum patientGender {
    MALE = 1,
    FEMALE = 2,
    OTHERS = 3,
}

export enum consultationBookingStatus {
    INIT = 0,
    BOOKED = 1,
    APPROVED = 2,
    STARTED = 3,
    COMPLETED = 4,
    REJECTED = 5,
    CANCELLED = 6,
    REMOVED = -1,
}
