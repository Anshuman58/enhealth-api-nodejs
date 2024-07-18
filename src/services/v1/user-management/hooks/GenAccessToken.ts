import { HookContext } from "@feathersjs/feathers";
import { AuthHelper } from "../../../../utils/AuthHelper/AuthHelper";

const GenAccessToken = () => async (context: HookContext) => {
    const { app } = context;

    if (context.result.accessToken) return;

    const data = { ...context.result };

    if (data.createdBy) return context;

    const newUser = await AuthHelper.generateAccessToken(data);

    Object.keys(context.result).forEach((e) => delete context.result[e]);

    context.result = newUser;

    return context;
};
export default GenAccessToken;
