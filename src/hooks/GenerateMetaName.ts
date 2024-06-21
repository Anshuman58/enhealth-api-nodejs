import { HookContext } from '@feathersjs/feathers';
import { generateMeta } from '../utils/generateMeta';
import { FeathersError } from '@feathersjs/errors';

const GenerateMetaName = (key: string, path: string) => async (context: HookContext) => {
    const { app, data, id, params } = context;
    const postData = data as any;
    const service = app.service(path);
    let query = {};
    let metaName = '';
    if (context.method === 'create' || postData.name) {
        const name = postData.name;
        metaName = generateMeta(name);

        query = {
            ...params.query,
            [`${key}`]: metaName,
        };
    } else if (context.method === 'patch') {
        if (id) {
            const idInNumber = parseInt(id.toString());
            query = {
                id: idInNumber,
            };
        }
    }

    // console.log(query);
    const dataFromDb: any | null = await service
        ._find({
            query,
        })
        .then((res: any) => (res.total > 0 ? res.data[0] : null));
    if (dataFromDb) {
        if (dataFromDb.status === 1) {
            if (context.method === 'create') {
                context.result = dataFromDb;
                return context;
            } else if (context.method === 'patch') {
                context.result = await service
                    ._patch(dataFromDb.id, { ...postData, status: 1 }, { ...params })
                    .catch((e: FeathersError) => {
                        throw e;
                    });
                return context;
            }
        } else {
            //it means if status is -1
            metaName = generateMeta(dataFromDb.name);
            context.result = await service
                ._patch(dataFromDb.id, { ...postData, [`${key}`]: metaName, status: 1 }, { ...params })
                .catch((e: FeathersError) => {
                    throw e;
                });
            return context;
        }
    } else {
        context.data[key] = metaName;
        return context;
    }
};

export default GenerateMetaName;
