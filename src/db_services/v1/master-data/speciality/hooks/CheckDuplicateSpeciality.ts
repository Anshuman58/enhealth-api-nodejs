import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
import { EntityStatus } from '../../../../../constants/EntityStatus';
import { Speciality_PATCH, Speciality_POST } from '../interfaces/SpecialityInterfaces';
import { SpecialityDbOperations } from '../utils/SpecialityDbOperations';

const CheckDuplicateSpeciality = () => async (context: HookContext) => {
    const { data, id } = context;

    const { name } = data as Speciality_POST | Speciality_PATCH;

    if (name) {
        const entityExists = await SpecialityDbOperations.getDataWithPagination({
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

        if (entityExists) throw new BadRequest(`Speciality with ${name} already exists.`);

        data.name = name.trim();
    }
};

export default CheckDuplicateSpeciality;
