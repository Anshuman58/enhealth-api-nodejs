import type { HookContext } from '@feathersjs/feathers';
import getProfileDetailsOfVendor from '../../../../global_utils/getProfileDetailsOfVendor';
import getProfileDetailsOfDoctor from '../../../../global_utils/getProfileDetailsOfDoctor';
import { UserRole } from '../../../../db_services/v1/user/interfaces/UserInterfaces';

const AttachProfileDetails = () => async (context: HookContext) => {
    const { user, accessToken } = context.result as any;

    if (accessToken && user) {
        switch (user.role) {
            case UserRole.VENDOR:
                context.result.user = await getProfileDetailsOfVendor(user._id.toString(), context);
                break;

            case UserRole.DOCTOR:
                context.result.user = await getProfileDetailsOfDoctor(user._id.toString(), context);
                break;
        }
    }

    return context;
};

export default AttachProfileDetails;
