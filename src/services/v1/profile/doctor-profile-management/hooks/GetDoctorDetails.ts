import { HookContext } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import getProfileDetailsOfDoctor from '../../../../../global_utils/getProfileDetailsOfDoctor';

const GetDoctorDetails = () => async (context: HookContext) => {
    const { id: userId } = context;

    if (!userId) throw new BadRequest('Please provide the user id to get details.');

    context.result = await getProfileDetailsOfDoctor(userId.toString(), context).catch((e) => {
        throw e;
    });
};

export default GetDoctorDetails;
