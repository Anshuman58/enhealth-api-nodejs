import { HookContext } from '@feathersjs/feathers';

const GenAccessToken = () => async (context: HookContext) => {
    const { app } = context;

    if (context.result.accessToken) return;

    const data = { ...context.result };


    if (data.createdBy) return context;

    const accessToken = await app.service('authentication').createAccessToken({ sub: data._id });

    Object.keys(context.result).forEach((e) => delete context.result[e]);

    context.result.accessToken = accessToken;
    context.result.user = data;

    return context;
};
export default GenAccessToken;
