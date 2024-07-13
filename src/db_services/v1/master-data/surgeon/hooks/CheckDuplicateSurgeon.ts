import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { Surgeon_PATCH, Surgeon_POST } from '../interfaces/SurgeonInterfaces';
import { SurgeonDbOperations } from '../utils/SurgeonDbOperations';
import { EntityStatus } from '../../../../../constants/EntityStatus';

const CheckDuplicateSurgeon = () => async (context: HookContext) => {
    const { data, id } = context;

    const { name } = data as Surgeon_POST | Surgeon_PATCH;

    if (name) {
        const entityExists = await SurgeonDbOperations.getDataWithPagination({
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

        if (entityExists) throw new BadRequest(`Surgeon with ${name} already exists.`);

        data.name = name.trim();
    }
};

export default CheckDuplicateSurgeon;
