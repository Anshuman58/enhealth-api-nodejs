import { HookContext } from '@feathersjs/feathers';
import { UpdateDoctorProfileRequest } from '../interfaces/UpdateDoctorProfileInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import type { DoctorConsultationFee_PATCH } from '../../../../../db_services/v1/consultation/doctor-consultation-fee/interfaces/DoctorConsultationFeeInterfaces';
import type { DoctorProfileDetails } from '../../../../../global_interface/DoctorProfileDetails';
import { DoctorConsultationFeeDbOperations } from '../../../../../db_services/v1/consultation/doctor-consultation-fee/utils/DoctorConsultationFeeDbOperations';

const UpdateDoctorConsultationFee = () => async (context: HookContext) => {
    const { data, result } = context;

    const { consultationFee = {} } = data as UpdateDoctorProfileRequest;

    const { onlineConsultationFee, clinicConsultationFee, homeConsultationFee } = consultationFee;

    const consultationFeesTobeUpdated: DoctorConsultationFee_PATCH = {};

    if (onlineConsultationFee) consultationFeesTobeUpdated.onlineConsultationFee = onlineConsultationFee;
    if (clinicConsultationFee) consultationFeesTobeUpdated.clinicConsultationFee = clinicConsultationFee;
    if (homeConsultationFee) consultationFeesTobeUpdated.homeConsultationFee = homeConsultationFee;

    const { profile } = result as DoctorProfileDetails;
    if (profile) {
        const { _id: doctorProfileId } = profile;
        if (doctorProfileId) {
            const doctorConsultationFeeData = await DoctorConsultationFeeDbOperations.getDataWithPagination({
                dbQuery: {
                    doctorProfile: doctorProfileId.toString(),
                    status: EntityStatus.ACTIVE,
                },
            }).then((res) => (res.total ? res.data[0] : null));

            if (doctorConsultationFeeData) {
                if (Object.keys(consultationFeesTobeUpdated).length) {
                    const feeData = await DoctorConsultationFeeDbOperations.modifyDatum({
                        id: doctorConsultationFeeData._id.toString(),
                        dbBody: {
                            ...consultationFeesTobeUpdated,
                        },
                    }).then((res) => (Array.isArray(res) ? res[0] : res));
                    profile.consultationFee = {
                        clinicConsultationFee: feeData.clinicConsultationFee,
                        onlineConsultationFee: feeData.onlineConsultationFee,
                        homeConsultationFee: feeData.homeConsultationFee,
                    };
                } else {
                    profile.consultationFee = {
                        clinicConsultationFee: doctorConsultationFeeData.clinicConsultationFee,
                        onlineConsultationFee: doctorConsultationFeeData.onlineConsultationFee,
                        homeConsultationFee: doctorConsultationFeeData.homeConsultationFee,
                    };
                }
            } else {
                const feeData = await DoctorConsultationFeeDbOperations.createDatum({
                    dbBody: {
                        ...consultationFeesTobeUpdated,
                        doctorProfile: doctorProfileId,
                    },
                });
                profile.consultationFee = {
                    clinicConsultationFee: feeData.clinicConsultationFee,
                    onlineConsultationFee: feeData.onlineConsultationFee,
                    homeConsultationFee: feeData.homeConsultationFee,
                };
            }
        }
        context.result.profile = profile;
    }

    return context;
};

export default UpdateDoctorConsultationFee;
