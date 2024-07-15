import { HookContext } from '@feathersjs/feathers';

const CheckNullQuery = (fieldNames: string | Array<string>) => async (context: HookContext) => {
    const { params } = context;

    if (!params) return context;

    const { query } = params;

    if (!query) return context;

    if (!Array.isArray(fieldNames)) fieldNames = [fieldNames];

    fieldNames.forEach((each) => {
        if (query[each]) {
            if (query[each] === 'null' || query[each] === 'NULL' || query[each] === '') query[each] = null;
            else if (query[each] !== 'null' || query[each] !== 'NULL') {
                const { $ne } = query[each];
                if ($ne) query[each] = { $ne: null };
            }
        }
    });

    return context;
};

export default CheckNullQuery;
