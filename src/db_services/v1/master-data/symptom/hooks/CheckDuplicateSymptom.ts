import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { Symptom_PATCH, Symptom_POST } from '../interfaces/SymptomIterfaces';
import { SymptomDbOperations } from '../utils/SymptomDbOperations';

const CheckDuplicateSymptom = () => async (context: HookContext) => {
    const { data, id } = context;

    const { name } = data as Symptom_POST | Symptom_PATCH;

    if (name) {
        const entityExists = await SymptomDbOperations.getDataWithPagination({
            dbQuery: {
                _id: id
                    ? {
                          $ne: id,
                      }
                    : {
                          $ne: null,
                      },
                status: {
                    $ne: EntityStatus.DELETED,
                },
                name: RegExp(`${name.trim()}`, 'i'),
            },
            specifiedQuery: {
                $limit: 1,
            },
        }).then((res) => !!res.total);

        if (entityExists) throw new BadRequest(`Symptom with ${name} already exists.`);

        data.name = name.trim();
    }
};

export default CheckDuplicateSymptom;
