
import { HookContext } from '@feathersjs/feathers';

const SetCurrentTime = (key: string) => async (context: HookContext) => {
    const { data } = context;

    if (Array.isArray(data)) {
        context.data.map((each: any) => {
            each[key] = new Date();
        });
    } else {
        context.data[key] = new Date();
    }
};

export default SetCurrentTime;
