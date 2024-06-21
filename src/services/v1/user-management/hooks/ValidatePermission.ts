import { HookContext } from '@feathersjs/feathers';
import { adminPermission } from '../../../../service_endpoints/services';
import { EntityStatus } from '../../../../global_interface/Interface';
import { BadRequest } from '@feathersjs/errors';

const ValidatePermission = () => async (context: HookContext) => {
    const {
        app,
        data: { permissions },
    } = context;

    if (permissions && Array.isArray(permissions)) {
        if (!permissions.length) throw new BadRequest('Please add permission to proceed');
        for (const each of permissions) {
            const res = await app
                .service(adminPermission)
                ._find({
                    query: {
                        meta: each,
                        status: EntityStatus.ACTIVE,
                    },
                })
                .then((res: any) => (res.total ? res.data[0] : null));

            if (!res) throw new BadRequest(`Invalid permission ${each}`);
        }
    }
};

export default ValidatePermission;
