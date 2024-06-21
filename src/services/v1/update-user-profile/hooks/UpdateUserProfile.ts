import { HookContext } from '@feathersjs/feathers';
import { userPath } from '../../../../service_endpoints/services';
import { BadRequest, FeathersError } from '@feathersjs/errors';

const UpdateUserProfile = () => async (context: HookContext) => {
    const {
        params: { user },
        data,
        app,
    } = context;

    context.result = await app
        .service(userPath)
        .patch(
            user?._id,
            {
                ...data,
            },
            {
                ...context.params,
                provider: 'server',
            },
        )
        .catch((e: FeathersError) => {
            console.log(e);
            throw new BadRequest('There was an issue with updating the profile');
        });
};

export default UpdateUserProfile;
