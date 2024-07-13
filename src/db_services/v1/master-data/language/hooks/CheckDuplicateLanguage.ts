import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Language_PATCH, Language_POST, LanguageStatus } from '../interfaces/LanguageInterfaces';
import { LanguageDbOperations } from '../utils/LanguageDbOperations';

const CheckDuplicateLanguage = () => async (context: HookContext) => {
    const { data, id } = context;

    const { name } = data as Language_POST | Language_PATCH;

    if (name) {
        const entityExists = await LanguageDbOperations.getDataWithPagination({
            dbQuery: {
                _id: id
                    ? {
                          $ne: id,
                      }
                    : {
                          $ne: null,
                      },
                status: {
                    $ne: LanguageStatus.DELETED,
                },
                name: RegExp(`${name.trim()}`, 'i'),
            },
            specifiedQuery: {
                $limit: 1,
            },
        }).then((res) => !!res.total);

        if (entityExists) throw new BadRequest(`Language with ${name} already exists.`);

        data.name = name.trim();
    }
};

export default CheckDuplicateLanguage;
