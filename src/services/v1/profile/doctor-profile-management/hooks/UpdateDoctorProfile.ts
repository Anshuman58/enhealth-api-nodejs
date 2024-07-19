import { HookContext } from '@feathersjs/feathers';
import { User_PATCH, UserStatus } from '../../../../../db_services/v1/user/interfaces/UserInterfaces';
// import { UserDbOperations } from '../../../../../db_services/v1/user/utils/UserDbOperations';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { UpdateDoctorProfileRequest } from '../interfaces/UpdateDoctorProfileInterfaces';
import { DoctorProfile_PATCH } from '../../../../../db_services/v1/profile/doctor-profile/interfaces/DoctorProfileInterfaces';
import { doctorProfilePath, userPath } from '../../../../../service_endpoints/services';
import type { FeathersError } from '@feathersjs/errors';

const UpdateDoctorProfile = () => async (context: HookContext) => {
    const { data, params, app } = context;

    const { query } = params;

    if (!query) return context;
    const { userId } = query;

    const {
        name,
        dob,
        phone,
        gender,
        avatar,
        registrationCertificate,
        description,
        address,
        hospitalName,
        clinicalEstablishmentCertificate,
        educations,
        awards,
        idProof,
        experiences,
        medicalLicense,
        languages,
        surgeonSpecializations,
        symptomSpecializations,
        specialities,
        workPlaceId,
        email,
        termsAndConditionAccepted,
    } = data as UpdateDoctorProfileRequest;

    const userPatchData: User_PATCH = {};

    if (name) userPatchData.name = name;
    if (phone) userPatchData.phone = phone;
    if (avatar) userPatchData.avatar = avatar;
    if (gender) userPatchData.gender = gender;
    if (email) userPatchData.email = email;

    const doctorProfilePatchData: DoctorProfile_PATCH = {};

    if (description) doctorProfilePatchData.description = description;
    if (registrationCertificate) doctorProfilePatchData.registrationCertificate = registrationCertificate;
    if (hospitalName) doctorProfilePatchData.hospitalName = hospitalName;
    if (clinicalEstablishmentCertificate)
        doctorProfilePatchData.clinicalEstablishmentCertificate = clinicalEstablishmentCertificate;
    if (educations) doctorProfilePatchData.educations = educations;
    if (idProof) doctorProfilePatchData.idProof = idProof;
    if (awards) doctorProfilePatchData.awards = awards;
    if (experiences) doctorProfilePatchData.experiences = experiences;
    if (medicalLicense) doctorProfilePatchData.medicalLicense = medicalLicense;
    if (languages) doctorProfilePatchData.languages = languages;
    if (surgeonSpecializations) doctorProfilePatchData.surgeonSpecializations = surgeonSpecializations;
    if (symptomSpecializations) doctorProfilePatchData.symptomSpecializations = symptomSpecializations;
    if (address) doctorProfilePatchData.address = address;
    if (workPlaceId) doctorProfilePatchData.workPlaceId = workPlaceId;
    if (specialities) doctorProfilePatchData.specialities = specialities;
    if (termsAndConditionAccepted) doctorProfilePatchData.termsAndConditionAccepted = termsAndConditionAccepted;

    let response = {};

    // If any user related modification operation then update the user data.
    if (Object.keys(userPatchData).length) {
        // const userPatchResponse = await UserDbOperations.modifyDatum({
        //     id: userId,
        //     dbBody: userPatchData,
        //     dbQuery: {
        //         status: {
        //             $in: [UserStatus.ACTIVE, UserStatus.INACTIVE],
        //         },
        //     },
        // }).catch((e) => {
        //     throw e;
        // });

        const userPatchResponse = await app
            .service(userPath)
            .patch(userId.toString(), userPatchData, {
                query: {
                    status: {
                        $in: [UserStatus.ACTIVE, UserStatus.INACTIVE],
                    },
                },
                provider: 'server',
            })
            .catch((e: FeathersError) => {
                throw e;
            });

        response = {
            ...userPatchResponse,
        };
    } else {
        // If not then get user details and attach it in response
        response = {
            ...params.user,
        };
    }

    // Get the profile details for the user.
    // let doctorProfileDetails = await DoctorProfileDbOperations.getDataWithPagination({
    //     dbQuery: {
    //         user: userId,
    //         status: EntityStatus.ACTIVE,
    //     },
    //     specifiedQuery: {
    //         $select: [
    //             'description',
    //             'registrationCertificate',
    //             'specialities',
    //             'symptomSpecializations',
    //             'surgeonSpecializations',
    //             'languages',
    //             'hospitalName',
    //             'experiences',
    //             'educations',
    //             'idProof',
    //             'awards',
    //             'medicalLicense',
    //             'clinicalEstablishmentCertificate',
    //             'workPlaceId',
    //             'termsAndConditionAccepted',
    //         ],
    //     },
    // }).then((res) => (res.total ? res.data[0] : null));

    let doctorProfileDetails = await app
        .service(doctorProfilePath)
        .find({
            query: {
                user: userId,
                status: EntityStatus.ACTIVE,
                $select: [
                    'description',
                    'registrationCertificate',
                    'specialities',
                    'symptomSpecializations',
                    'surgeonSpecializations',
                    'languages',
                    'hospitalName',
                    'experiences',
                    'educations',
                    'idProof',
                    'awards',
                    'medicalLicense',
                    'clinicalEstablishmentCertificate',
                    'workPlaceId',
                    'termsAndConditionAccepted',
                ],
            },
            provider: 'server',
        })
        .then((res: any) => (res.total ? res.data[0] : null));

    // If profile does not exist create one for user.
    if (!doctorProfileDetails) {
        doctorProfileDetails = await app
            .service(doctorProfilePath)
            .create(
                { user: userId },
                {
                    query: {
                        $select: [
                            'description',
                            'registrationCertificate',
                            'specialities',
                            'symptomSpecializations',
                            'surgeonSpecializations',
                            'languages',
                            'hospitalName',
                            'experiences',
                            'educations',
                            'idProof',
                            'awards',
                            'medicalLicense',
                            'clinicalEstablishmentCertificate',
                            'workPlaceId',
                            'termsAndConditionAccepted',
                        ],
                    },
                    provider: 'server',
                },
            )
            .catch((e: FeathersError) => {
                throw e;
            });
        // await UserDbOperations.modifyDatum({
        //     id: userId,
        //     dbBody: {
        //         doctorProfile: doctorProfileDetails._id,
        //     },
        // });
        await app.service(userPath)._patch(userId, {
            doctorProfile: doctorProfileDetails._id,
        });
    }

    // Check if any profile related modification required.
    if (Object.keys(doctorProfilePatchData).length) {
        if (
            typeof doctorProfilePatchData.termsAndConditionAccepted !== 'undefined' &&
            typeof doctorProfileDetails.termsAndConditionAccepted !== 'undefined'
        ) {
            // throw new BadRequest('You can not perform this operation.');
            doctorProfilePatchData.termsAndConditionAccepted = undefined;
        }

        const doctorProfilePatchResponse = await app
            .service(doctorProfilePath)
            .patch(doctorProfileDetails._id.toString(), doctorProfilePatchData, {
                query: {
                    status: EntityStatus.ACTIVE,
                    $select: [
                        'description',
                        'registrationCertificate',
                        'specialities',
                        'symptomSpecializations',
                        'surgeonSpecializations',
                        'languages',
                        'hospitalName',
                        'experiences',
                        'educations',
                        'idProof',
                        'awards',
                        'medicalLicense',
                        'clinicalEstablishmentCertificate',
                        'workPlaceId',
                        'termsAndConditionAccepted',
                    ],
                },
                provider: 'server',
            })
            .catch((err: FeathersError) => {
                throw err;
            });
        //  const doctorProfilePatchResponse = await DoctorProfileDbOperations.modifyDatum({
        //     id: doctorProfileDetails._id.toString(),
        //     dbBody: doctorProfilePatchData,
        //     dbQuery: {
        //         status: EntityStatus.ACTIVE,
        //     },
        //     specifiedQuery: {
        //         $select: [
        //             'description',
        //             'registrationCertificate',
        //             'specialities',
        //             'symptomSpecializations',
        //             'surgeonSpecializations',
        //             'languages',
        //             'hospitalName',
        //             'experiences',
        //             'educations',
        //             'idProof',
        //             'awards',
        //             'medicalLicense',
        //             'clinicalEstablishmentCertificate',
        //             'workPlaceId',
        //             'termsAndConditionAccepted',
        //         ],
        //     },
        // }).catch((e) => {
        //     throw e;
        // });
        response = {
            ...response,
            profile: doctorProfilePatchResponse,
        };
    } else {
        // If not attach profile details in response.
        response = {
            ...response,
            profile: doctorProfileDetails,
        };
    }

    context.result = response;
};

export default UpdateDoctorProfile;
