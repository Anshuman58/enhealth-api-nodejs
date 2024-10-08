
import { BadRequest } from '@feathersjs/errors';
import { HookContext } from '@feathersjs/feathers';
// import { AllCountries } from '../db_services/v1/country/interfaces/CountryInterfaces';

/**
 * @description check if same name already exists.
 * @param key
 * @constructor
 */
const CheckNameAlreadyExists = (key: string) => async (context: HookContext) => {
    const { data, app, id, path } = context;

    const { name } = data;

    if (name) {
        const query: { name: RegExp; status: any; _id: any } = {
            name: RegExp(`${name.trim()}`, 'i'),
            status: { $ne: -1 },
            _id: { $ne: null },
        };

        if (id) {
            query._id = {
                $ne: id,
            };
        }

        const entityExist = await app
            .service(`${path}`)
            ._find({
                query,
                paginate: false,
            })
            .then((res: any) => res.length);
        if (entityExist) throw new BadRequest(`${key} with ${name} already exists.`);

        data.name = name.trim();
    }
};
export default CheckNameAlreadyExists;
