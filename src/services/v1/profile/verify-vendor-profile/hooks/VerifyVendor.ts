import { HookContext } from '@feathersjs/feathers';
// import { UserDbOperations } from '../../../../../db_services/v1/user/utils/UserDbOperations';
import { UserRole, UserStatus } from '../../../../../db_services/v1/user/interfaces/UserInterfaces';
import { EntityStatus } from '../../../../../constants/EntityStatus';
// import { VendorProfileDbOperations } from '../../../../../db_services/v1/profile/vendor-profile/utils/VendorProfileDbOperations';
import { userPath, vendorProfilePath } from '../../../../../service_endpoints/services';
import type { FeathersError } from '@feathersjs/errors';

const VerifyVendor = () => async (context: HookContext) => {
    const { data, app } = context;

    const { id } = data;

    const userResponse = await app
        .service(userPath)
        ._patch(id.toString(), { status: UserStatus.ACTIVE }, { query: { role: UserRole.VENDOR } })
        .catch((err: FeathersError) => {
            throw err;
        });

    const userData = userResponse as any;

    if (userData.vendorProfile) {
        // await VendorProfileDbOperations.modifyDatum({
        //     id: userData.vendorProfile.toString(),
        //     dbBody: {
        //         status: EntityStatus.ACTIVE,
        //     },
        // });

        await app.service(vendorProfilePath)._patch(userData.vendorProfile.toString(), { status: EntityStatus.ACTIVE });
    }

    context.result = userData;
};

export default VerifyVendor;
