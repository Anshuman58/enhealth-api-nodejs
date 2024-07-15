import { HookContext } from "@feathersjs/feathers";
// import { UserDbOperations } from '../../../../../db_services/v1/user/utils/UserDbOperations';
import {
    User_GET,
    UserRole,
    UserStatus,
} from "../../../../../db_services/v1/user/interfaces/UserInterfaces";
import { EntityStatus } from "../../../../../constants/EntityStatus";
// import { DoctorProfileDbOperations } from '../../../../../db_services/v1/profile/doctor-profile/utils/DoctorProfileDbOperations';
// import { DoctorSlotDbOperations } from '../../../../../db_services/v1/consultation/doctor-slot/utils/DoctorSlotDbOperations';
// import { ConsultationType } from '../../../../../constants/ConsultationType';
// import { Types } from 'mongoose';
// import { WeekDays } from '../../../../../constants/WeekDays';
import {
    doctorProfilePath,
    userPath,
} from "../../../../../service_endpoints/services";
import type { FeathersError } from "@feathersjs/errors";

const VerifyDoctor = () => async (context: HookContext) => {
    const { data, app } = context;

    const { id } = data;

    const userResponse = await app
        .service(userPath)
        ._patch(
            id.toString(),
            { status: UserStatus.ACTIVE },
            { query: { role: UserRole.DOCTOR } }
        )
        .catch((err: FeathersError) => {
            throw err;
        });

    const userData = userResponse as any;

    if (userData.doctorProfile) {
        // await DoctorProfileDbOperations.modifyDatum({
        //     id: userData.doctorProfile.toString(),
        //     dbBody: {
        //         status: EntityStatus.ACTIVE,
        //     },
        // });

        await app
            .service(doctorProfilePath)
            ._patch(userData.doctorProfile.toString(), {
                status: EntityStatus.ACTIVE,
            });

        // await DoctorSlotDbOperations.createData({
        //     dbBody: [ConsultationType.ONLINE, ConsultationType.HOME, ConsultationType.CLINIC].map((c) => {
        //         return {
        //             doctorProfile: userData.doctorProfile as Types.ObjectId,
        //             availability: [
        //                 WeekDays.SUNDAY,
        //                 WeekDays.MONDAY,
        //                 WeekDays.TUESDAY,
        //                 WeekDays.WEDNESDAY,
        //                 WeekDays.THURSDAY,
        //                 WeekDays.FRIDAY,
        //                 WeekDays.SATURDAY,
        //             ].map((e) => {
        //                 return {
        //                     day: e,
        //                     slots: [],
        //                 };
        //             }),
        //             consultationType: c,
        //             createdBy: userData._id,
        //         };
        //     }),
        // });
    }

    context.result = userData;
};

export default VerifyDoctor;
