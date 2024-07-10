import type { HookContext } from '@feathersjs/feathers';
import getProfileDetailsOfVendor from '../../../../global_utils/getProfileDetailsOfVendor';
import { UserRole } from '../../../../db_services/v1/user/interfaces/UserInterfaces';

const AttachProfileDetails = () => async (context: HookContext) => {
    const { user, accessToken } = context.result as any;

    if (accessToken && user) {
        switch (user.role) {
            case UserRole.VENDOR:
                context.result.user = await getProfileDetailsOfVendor(user._id.toString(), context);
        }
    }

    return context;
};

export default AttachProfileDetails;
