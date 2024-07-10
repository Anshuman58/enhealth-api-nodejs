import { UserRole, UserStatus } from '../db_services/v1/user/interfaces/UserInterfaces';
import { Types } from 'mongoose';
import { BadRequest } from '@feathersjs/errors';
import { EntityStatus } from '../constants/EntityStatus';
import type { DoctorProfileDetails } from '../global_interface/DoctorProfileDetails';
import type { HookContext } from '@feathersjs/feathers';
import { userPath } from '../service_endpoints/services';

const getProfileDetailsOfDoctor = async (userId: string, context: HookContext): Promise<DoctorProfileDetails> => {
    const { app } = context;
    const userQuery: any = {
        _id: new Types.ObjectId(userId),
        status: {
            $ne: UserStatus.REMOVED,
        },
        role: UserRole.DOCTOR,
    };
    const userDetails = await app.service(userPath).Model.aggregate([
        {
            $match: userQuery,
        },
        {
            $lookup: {
                from: 'doctorprofiles',
                let: { userId: '$_id' },
                pipeline: [
                    {
                        $match: {
                            $expr: { $eq: ['$user', '$$userId'] },
                            status: EntityStatus.ACTIVE,
                        },
                    },
                    {
                        $project: {
                            description: 1,
                            address: 1,
                            specialities: 1,
                            symptomSpecializations: 1,
                            surgeonSpecializations: 1,
                            languages: 1,
                            hospitalName: 1,
                            experiences: 1,
                            educations: 1,
                            idProof: 1,
                            awards: 1,
                            registrationCertificate: 1,
                            medicalLicense: 1,
                            clinicalEstablishmentCertificate: 1,
                            workPlaceId: 1,
                            termsAndConditionAccepted: 1,
                        },
                    },
                    {
                        $lookup: {
                            from: 'doctorconsultationfees',
                            let: { profileId: '$_id' },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: { $eq: ['$doctorProfile', '$$profileId'] },
                                        status: EntityStatus.ACTIVE,
                                    },
                                },
                                {
                                    $project: {
                                        onlineConsultationFee: 1,
                                        clinicConsultationFee: 1,
                                        homeConsultationFee: 1,
                                        _id: 0,
                                    },
                                },
                            ],
                            as: 'consultationFee',
                        },
                    },
                    {
                        $unwind: { path: '$consultationFee', preserveNullAndEmptyArrays: true },
                    },
                ],
                as: 'profile',
            },
        },
        {
            $unwind: { path: '$profile', preserveNullAndEmptyArrays: true },
        },
    ]);

    if (!userDetails.length) {
        throw new BadRequest('Doctor data not found.');
    }

    if (!userDetails[0].profile) userDetails[0].profile = null;
    if (userDetails[0].profile && !userDetails[0].profile.consultationFee)
        userDetails[0].profile.consultationFee = null;
    return userDetails[0];
};

export default getProfileDetailsOfDoctor;
