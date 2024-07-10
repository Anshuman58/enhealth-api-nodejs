import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import getProfileDetailsOfVendor from '../../../../../global_utils/getProfileDetailsOfVendor';

const GetVendorDetails = () => async (context: HookContext) => {
    const { id: userId, app } = context;

    if (!userId) throw new BadRequest('Please provide the user id to get details.');

    context.result = await getProfileDetailsOfVendor(userId.toString(), context).catch((e) => {
        throw e;
    });
};

export default GetVendorDetails;
